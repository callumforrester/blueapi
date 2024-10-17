import base64
from pathlib import Path
from unittest.mock import Mock, patch

import jwt
import pytest
import responses
from pydantic import BaseModel

from blueapi.client.rest import BlueapiRestClient, BlueskyRemoteControlError
from blueapi.config import OAuthClientConfig, OAuthServerConfig
from blueapi.core.bluesky_types import Plan
from blueapi.service.authentication import CliTokenManager, SessionManager
from blueapi.service.model import PlanModel, PlanResponse


@pytest.fixture
@responses.activate
def rest(tmp_path: Path) -> BlueapiRestClient:
    responses.add(
        responses.GET,
        "http://example.com",
        json={
            "device_authorization_endpoint": "https://example.com/device_authorization",
            "authorization_endpoint": "https://example.com/authorization",
            "token_endpoint": "https://example.com/token",
            "issuer": "https://example.com",
            "jwks_uri": "https://example.com/realms/master/protocol/openid-connect/certs",
            "end_session_endpoint": "https://example.com/logout",
        },
        status=200,
    )
    with open(tmp_path / "token", "w") as token_file:
        # base64 encoded token
        token_file.write(
            base64.b64encode(
                b'{"access_token":"token","refresh_token":"refresh_token"}'
            ).decode("utf-8")
        )
    session_manager = SessionManager(
        token_manager=CliTokenManager(tmp_path / "token"),
        client_config=OAuthClientConfig(client_id="foo", client_audience="bar"),
        server_config=OAuthServerConfig(oidc_config_url="http://example.com"),
    )
    return BlueapiRestClient(session_manager=session_manager)


@pytest.mark.parametrize(
    "code,expected_exception",
    [
        (404, KeyError),
        (450, BlueskyRemoteControlError),
        (500, BlueskyRemoteControlError),
    ],
)
@patch("blueapi.client.rest.requests.request")
def test_rest_error_code(
    mock_request: Mock,
    rest: BlueapiRestClient,
    code: int,
    expected_exception: type[Exception],
):
    response = Mock()
    response.status_code = code
    mock_request.return_value = response
    with pytest.raises(expected_exception):
        rest.get_plans()


class MyModel(BaseModel):
    id: str


@responses.activate
def test_auth_request_functionality(rest: BlueapiRestClient):
    plan = Plan(name="my-plan", model=MyModel)
    responses.add(
        responses.GET,
        "http://localhost:8000/plans",
        json=PlanResponse(plans=[PlanModel.from_plan(plan)]).model_dump(),
        status=200,
    )
    with patch("blueapi.service.Authenticator.verify_token") as mock_verify_token:
        # Mock the verify_token function to return True (indicating a valid token)
        mock_verify_token.return_value = True

        result = rest.get_plans()
        # Add assertions as needed
        assert result == PlanResponse(plans=[PlanModel.from_plan(plan)])


@responses.activate
def test_refresh_if_signature_expired(rest: BlueapiRestClient):
    plan = Plan(name="my-plan", model=MyModel)
    responses.add(
        responses.GET,
        "http://localhost:8000/plans",
        json=PlanResponse(plans=[PlanModel.from_plan(plan)]).model_dump(),
        status=200,
    )
    with (
        patch("blueapi.service.Authenticator.verify_token") as mock_verify_token,
        patch(
            "blueapi.service.SessionManager.refresh_auth_token"
        ) as mock_refresh_token,
    ):
        mock_verify_token.side_effect = jwt.ExpiredSignatureError
        mock_refresh_token.return_value = True
        result = rest.get_plans()
        assert result == PlanResponse(plans=[PlanModel.from_plan(plan)])


@responses.activate
def test_handle_exceptions_other_than_expired_token(rest: BlueapiRestClient):
    plan = Plan(name="my-plan", model=MyModel)
    responses.add(
        responses.GET,
        "http://localhost:8000/plans",
        json=PlanResponse(plans=[PlanModel.from_plan(plan)]).model_dump(),
        status=200,
    )
    with (
        patch("blueapi.service.Authenticator.verify_token") as mock_verify_token,
    ):
        mock_verify_token.side_effect = Exception
        result = rest.get_plans()
        assert result == PlanResponse(plans=[PlanModel.from_plan(plan)])
