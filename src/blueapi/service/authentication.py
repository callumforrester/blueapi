from __future__ import annotations

import base64
import json
import os
import time
from abc import ABC, abstractmethod
from functools import cached_property
from http import HTTPStatus
from pathlib import Path
from typing import Any, cast

import jwt
import requests

from blueapi.config import CLIClientConfig, OIDCConfig


class TokenManager(ABC):
    @abstractmethod
    def save_token(self, token: dict[str, Any]) -> None: ...
    @abstractmethod
    def load_token(token) -> dict[str, Any]: ...
    @abstractmethod
    def delete_token(self) -> None: ...


class NoOpTokenManager(TokenManager):
    def __init__(self, warning: str = "Session not configured to persist!"):
        self._warning = warning

    def save_token(self, token: dict[str, Any]) -> None:
        print(self._warning)

    def load_token(self) -> dict[str, Any]:
        raise ValueError(self._warning)

    def delete_token(self) -> None:
        print(self._warning)


class CliTokenManager(TokenManager):
    def __init__(self, token_path: Path) -> None:
        self._token_path: Path = token_path

    @cached_property
    def _file_path(self) -> str:
        return os.path.expanduser(self._token_path)

    def save_token(self, token: dict[str, Any]) -> None:
        token_json: str = json.dumps(token)
        token_base64: bytes = base64.b64encode(token_json.encode("utf-8"))
        with open(self._file_path, "wb") as token_file:
            token_file.write(token_base64)

    def load_token(self) -> dict[str, Any]:
        if not os.path.exists(self._file_path):
            raise FileNotFoundError
        with open(self._file_path, "rb") as token_file:
            token_base64: bytes = token_file.read()
            token_json: str = base64.b64decode(token_base64).decode("utf-8")
            return json.loads(token_json)

    def delete_token(self) -> None:
        Path(self._file_path).unlink(missing_ok=True)


class SessionManager:
    def __init__(
        self,
        server_config: OIDCConfig,
    ) -> None:
        self._server_config = server_config
        self._token_manager: TokenManager = (
            CliTokenManager(server_config.token_path)
            if isinstance(server_config, CLIClientConfig)
            else NoOpTokenManager()
        )

    @cached_property
    def client(self):
        return jwt.PyJWKClient(self._server_config.jwks_uri)

    def get_token(self) -> dict[str, Any]:
        return self._token_manager.load_token()

    def logout(self) -> None:
        self._token_manager.delete_token()

    def decode_jwt(self, json_web_token: str):
        signing_key = self.client.get_signing_key_from_jwt(json_web_token)
        return jwt.decode(
            json_web_token,
            signing_key.key,
            algorithms=self._server_config.id_token_signing_alg_values_supported,
            verify=True,
            audience=self._server_config.client_audience,
            issuer=self._server_config.issuer,
        )

    def decode_token(self, token: dict[str, Any]) -> dict[str, Any]:
        try:
            # If the access_token is a JWT, we check if it is still valid
            return self.decode_jwt(token["access_token"])
        except jwt.DecodeError:
            # Else, we check if the id_token is still valid
            return self.decode_jwt(token["id_token"])

    def refresh_auth_token(self) -> dict[str, Any]:
        token = self._token_manager.load_token()
        response = requests.post(
            self._server_config.token_endpoint,
            json={
                "client_id": self._server_config.client_id,
                "grant_type": "refresh_token",
                "refresh_token": token["refresh_token"],
            },
        )
        response.raise_for_status()
        token = response.json()
        self._token_manager.save_token(token)
        return token

    def poll_for_token(
        self, device_code: str, polling_interval: float, expires_in: float
    ) -> dict[str, Any]:
        expiry_time: float = time.time() + expires_in
        while time.time() < expiry_time:
            response = requests.post(
                self._server_config.token_endpoint,
                json={
                    "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
                    "device_code": device_code,
                    "client_id": self._server_config.client_id,
                },
            )
            if response.status_code == HTTPStatus.OK:
                return response.json()
            time.sleep(polling_interval)

        raise TimeoutError("Polling timed out")

    def _do_device_flow(self) -> None:
        response: requests.Response = requests.post(
            self._server_config.device_authorization_endpoint,
            json={
                "client_id": self._server_config.client_id,
                "scope": "openid profile offline_access",
                "audience": self._server_config.client_audience,
            },
        )

        response.raise_for_status()

        response_json: dict[str, Any] = response.json()
        device_code = cast(str, response_json.get("device_code"))
        interval = cast(float, response_json.get("interval"))
        expires_in = cast(float, response_json.get("expires_in"))
        print(
            "Please login from this URL:- "
            f"{response_json['verification_uri_complete']}"
        )
        auth_token_json: dict[str, Any] = self.poll_for_token(
            device_code, interval, expires_in
        )
        self._token_manager.save_token(auth_token_json)
        print("Logged in and cached new token")

    def start_device_flow(self):
        try:
            token = self._token_manager.load_token()
            self.decode_token(token)
            print("Cached token still valid, skipping flow")
        except jwt.ExpiredSignatureError:
            token = self.refresh_auth_token()
            print("Refreshed cached token, skipping flow")
        except FileNotFoundError:
            self._do_device_flow()
        except Exception:
            print("Problem with cached token, starting new session")
            self._token_manager.delete_token()
