import asyncio
import base64
import json
import time
from pathlib import Path
from typing import Any, cast

# Based on https://docs.pytest.org/en/latest/example/simple.html#control-skipping-of-tests-according-to-command-line-option  # noqa: E501
import jwt
import pytest
import responses
import responses.matchers
import yaml
from bluesky import RunEngine
from bluesky.run_engine import TransitionError
from jwcrypto.jwk import JWK
from observability_utils.tracing import JsonObjectSpanExporter, setup_tracing
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor
from opentelemetry.trace import get_tracer_provider

from blueapi.config import ApplicationConfig, CLIClientConfig


@pytest.fixture(scope="function")
def RE(request):
    loop = asyncio.new_event_loop()
    loop.set_debug(True)
    RE = RunEngine({}, call_returns_result=True, loop=loop)

    def clean_event_loop():
        if RE.state not in ("idle", "panicked"):
            try:
                RE.halt()
            except TransitionError:
                pass
        loop.call_soon_threadsafe(loop.stop)
        RE._th.join()
        loop.close()

    request.addfinalizer(clean_event_loop)
    return RE


@pytest.fixture(scope="session")
def exporter() -> TracerProvider:
    setup_tracing("test", False)
    exporter = JsonObjectSpanExporter()
    provider = cast(TracerProvider, get_tracer_provider())
    # Use SimpleSpanProcessor to keep tests quick
    provider.add_span_processor(SimpleSpanProcessor(exporter))
    return exporter


@pytest.fixture
def valid_oidc_url() -> str:
    return "https://auth.example.com/realms/sample/.well-known/openid-configuration"


@pytest.fixture
def oidc_config(valid_oidc_url: str, tmp_path: Path) -> CLIClientConfig:
    return CLIClientConfig(
        well_known_url=valid_oidc_url,
        client_id="example-client",
        client_audience="example",
        token_file_path=tmp_path / "token",
    )


@pytest.fixture
def valid_auth_config(tmp_path: Path, oidc_config: CLIClientConfig) -> Path:
    config = ApplicationConfig(oidc_config=oidc_config)
    config_path = tmp_path / "auth_config.yaml"
    with open(config_path, mode="w") as valid_auth_config_file:
        valid_auth_config_file.write(yaml.dump(config.model_dump()))
    return config_path


@pytest.fixture
def valid_oidc_config() -> dict[str, Any]:
    return {
        "device_authorization_endpoint": "https://example.com/device_authorization",
        "authorization_endpoint": "https://example.com/authorization",
        "token_endpoint": "https://example.com/token",
        "issuer": "https://example.com",
        "jwks_uri": "https://example.com/realms/master/protocol/openid-connect/certs",
        "end_session_endpoint": "https://example.com/logout",
        "id_token_signing_alg_values_supported": ["RS256", "RS384", "RS512"],
    }


@pytest.fixture(scope="session")
def json_web_keyset() -> JWK:
    return JWK.generate(kty="RSA", size=1024, kid="secret", use="sig", alg="RSA256")


@pytest.fixture(scope="session")
def rsa_private_key(json_web_keyset: JWK) -> str:
    return json_web_keyset.export_to_pem("private_key", password=None).decode("utf-8")


def _make_token(
    name: str, issued_in: float, expires_in: float, tmp_path: Path, rsa_private_key: str
) -> dict[str, str]:
    now = time.time()

    id_token = {
        "aud": "default-demo",
        "exp": now + expires_in,
        "iat": now + issued_in,
        "iss": "https://example.com",
        "sub": "jd1",
        "name": "Jane Doe",
        "fedid": "jd1",
    }
    response = {
        "access_token": name,
        "token_type": "Bearer",
        "refresh_token": "refresh_token",
        "id_token": f"{jwt.encode(id_token, key=rsa_private_key, algorithm="RS256", headers={"kid": "secret"})}",
    }
    return response


@pytest.fixture
def cached_expired_token(tmp_path: Path, expired_token: dict[str, Any]) -> Path:
    token_path = tmp_path / "token"
    token_json = json.dumps(expired_token)
    with open(token_path, "w") as token_file:
        token_file.write(base64.b64encode(token_json.encode("utf-8")).decode("utf-8"))
    return token_path


@pytest.fixture
def cached_valid_token(tmp_path: Path, valid_token: dict[str, Any]) -> Path:
    token_path = tmp_path / "token"
    token_json = json.dumps(valid_token)
    with open(token_path, "w") as token_file:
        token_file.write(base64.b64encode(token_json.encode("utf-8")).decode("utf-8"))
    return token_path


@pytest.fixture
def expired_token(tmp_path: Path, rsa_private_key: str) -> dict[str, Any]:
    return _make_token("expired_token", -3600, -1800, tmp_path, rsa_private_key)


@pytest.fixture
def valid_token(tmp_path: Path, rsa_private_key: str) -> dict[str, Any]:
    return _make_token("valid_token", -900, +900, tmp_path, rsa_private_key)


@pytest.fixture
def new_token(tmp_path: Path, rsa_private_key: str) -> dict[str, Any]:
    return _make_token("new_token", -100, +1700, tmp_path, rsa_private_key)


@pytest.fixture
def mock_authn_server(
    valid_oidc_url: str,
    valid_oidc_config: dict[str, Any],
    oidc_config: CLIClientConfig,
    valid_token: dict[str, Any],
    json_web_keyset: JWK,
    new_token: dict[str, Any],
):
    requests_mock = responses.RequestsMock(assert_all_requests_are_fired=False)
    # Fetch well-known OIDC flow URLs from server
    requests_mock.get(valid_oidc_url, json=valid_oidc_config)
    requests_mock.get(
        valid_oidc_config["jwks_uri"],
        json={"keys": [json_web_keyset.export_public(as_dict=True)]},
    )
    # When device flow begins, return a device_code
    device_code = "ff83j3dk"
    requests_mock.post(
        valid_oidc_config["device_authorization_endpoint"],
        json={
            "device_code": device_code,
            "verification_uri_complete": valid_oidc_config["issuer"] + "/verify",
            "expires_in": 30,
            "interval": 5,
        },
    )

    # When polled with device_code return token
    requests_mock.post(
        valid_oidc_config["token_endpoint"],
        json=valid_token,
        match=[
            responses.matchers.json_params_matcher(
                {
                    "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
                    "device_code": device_code,
                    "client_id": oidc_config.client_id,
                }
            ),
        ],
    )
    # When asked to refresh with refresh_token return refreshed token
    requests_mock.post(
        valid_oidc_config["token_endpoint"],
        json=new_token,
        match=[
            responses.matchers.json_params_matcher(
                {
                    "client_id": oidc_config.client_id,
                    "grant_type": "refresh_token",
                    "refresh_token": "refresh_token",
                },
            )
        ],
    )

    return requests_mock
