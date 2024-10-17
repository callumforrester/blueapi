import base64
import json

import jwt
import matplotlib

matplotlib.use("Agg")
from collections.abc import Mapping
from dataclasses import dataclass
from io import StringIO
from pathlib import Path
from textwrap import dedent
from typing import Any
from unittest.mock import Mock, patch

import pytest
import responses
from bluesky_stomp.messaging import StompClient
from click.testing import CliRunner
from pydantic import BaseModel, ValidationError
from requests.exceptions import ConnectionError
from responses import matchers
from stomp.connect import StompConnection11 as Connection

from blueapi import __version__
from blueapi.cli.cli import main
from blueapi.cli.format import OutputFormat, fmt_dict
from blueapi.client.rest import BlueskyRemoteControlError
from blueapi.config import ScratchConfig, ScratchRepository
from blueapi.core.bluesky_types import DataEvent, Plan
from blueapi.service.model import (
    DeviceModel,
    DeviceResponse,
    EnvironmentResponse,
    PlanModel,
    PlanResponse,
)
from blueapi.worker.event import ProgressEvent, TaskStatus, WorkerEvent, WorkerState


@pytest.fixture
def mock_connection() -> Mock:
    return Mock(spec=Connection)


@pytest.fixture
def template(mock_connection: Mock) -> StompClient:
    return StompClient(conn=mock_connection)


@pytest.fixture
def runner() -> CliRunner:
    return CliRunner()


def test_cli_version(runner: CliRunner):
    result = runner.invoke(main, ["--version"])
    assert result.stdout == f"blueapi, version {__version__}\n"


def test_main_no_params():
    runner = CliRunner()
    result = runner.invoke(main)
    expected = "Please invoke subcommand!\n"

    assert result.stdout == expected


@patch("requests.request")
def test_connection_error_caught_by_wrapper_func(
    mock_requests: Mock, runner: CliRunner
):
    mock_requests.side_effect = ConnectionError()
    result = runner.invoke(main, ["controller", "plans"])

    assert result.stdout == "Failed to establish connection to FastAPI server.\n"


class MyModel(BaseModel):
    id: str


@dataclass
class MyDevice:
    name: str


@responses.activate
def test_get_plans(
    runner: CliRunner,
):
    plan = Plan(name="my-plan", model=MyModel)

    response = responses.add(
        responses.GET,
        "http://localhost:8000/plans",
        json=PlanResponse(plans=[PlanModel.from_plan(plan)]).model_dump(),
        status=200,
    )

    plans = runner.invoke(main, ["controller", "plans"])
    assert plans.output == "my-plan\n    Args\n      id=string (Required)\n"
    assert response.call_count == 1


@responses.activate
def test_get_devices(runner: CliRunner):
    device = MyDevice(name="my-device")

    response = responses.add(
        responses.GET,
        "http://localhost:8000/devices",
        json=DeviceResponse(devices=[DeviceModel.from_device(device)]).model_dump(),
        status=200,
    )

    plans = runner.invoke(main, ["controller", "devices"])
    assert response.call_count == 1
    assert plans.output == "my-device\n    HasName\n"


def test_invalid_config_path_handling(runner: CliRunner):
    # test what happens if you pass an invalid config file...
    result = runner.invoke(main, ["-c", "non_existent.yaml"])
    assert result.exit_code == 1


@responses.activate
def test_submit_plan(runner: CliRunner):
    body_data = {"name": "sleep", "params": {"time": 5}}

    response = responses.post(
        url="http://a.fake.host:12345/tasks",
        match=[matchers.json_params_matcher(body_data)],
    )

    config_path = "tests/unit_tests/example_yaml/rest_config.yaml"
    runner.invoke(
        main, ["-c", config_path, "controller", "run", "sleep", '{"time": 5}']
    )

    assert response.call_count == 1


def test_invalid_stomp_config_for_listener(runner: CliRunner):
    result = runner.invoke(main, ["controller", "listen"])
    assert isinstance(result.exception, RuntimeError)
    assert str(result.exception) == "Message bus needs to be configured"


def test_cannot_run_plans_without_stomp_config(runner: CliRunner):
    result = runner.invoke(main, ["controller", "run", "sleep", '{"time": 5}'])
    assert result.exit_code == 1
    assert isinstance(result.exception, RuntimeError)
    assert (
        str(result.exception)
        == "Cannot run plans without Stomp configuration to track progress"
    )


@patch("blueapi.cli.cli.StompClient")
def test_valid_stomp_config_for_listener(
    template: StompClient,
    runner: CliRunner,
    mock_connection: Mock,
):
    mock_connection.is_connected.return_value = True
    result = runner.invoke(
        main,
        [
            "-c",
            "tests/unit_tests/example_yaml/valid_stomp_config.yaml",
            "controller",
            "listen",
        ],
        input="\n",
    )
    assert result.output == dedent("""\
                Subscribing to all bluesky events from localhost:61613
                Press enter to exit
                """)
    assert result.exit_code == 0


@responses.activate
def test_get_env(
    runner: CliRunner,
):
    responses.add(
        responses.GET,
        "http://localhost:8000/environment",
        json=EnvironmentResponse(initialized=True).model_dump(),
        status=200,
    )

    env = runner.invoke(main, ["controller", "env"])
    assert env.output == "initialized=True error_message=None\n"


@responses.activate(assert_all_requests_are_fired=True)
@patch("blueapi.client.client.time.sleep", return_value=None)
def test_reset_env_client_behavior(
    mock_sleep: Mock,
    runner: CliRunner,
):
    responses.add(
        responses.DELETE,
        "http://localhost:8000/environment",
        json=EnvironmentResponse(initialized=False).model_dump(),
        status=200,
    )

    env_state = [False, False, True]

    for state in env_state:
        responses.add(
            responses.GET,
            "http://localhost:8000/environment",
            json=EnvironmentResponse(initialized=state).model_dump(),
            status=200,
        )

    # Invoke the CLI command that would trigger the environment initialization check
    reload_result = runner.invoke(main, ["controller", "env", "-r"])

    # Verify if sleep was called between polling iterations
    assert mock_sleep.call_count == 2  # Since the last check doesn't require a sleep

    for index, call in enumerate(responses.calls):
        if index == 0:
            assert call.request.method == "DELETE"
            assert call.request.url == "http://localhost:8000/environment"
        else:
            assert call.request.method == "GET"
            assert call.request.url == "http://localhost:8000/environment"

    # Check if the final environment status is printed correctly
    # assert "Environment is initialized." in result.output
    assert reload_result.output == dedent("""\
                Reloading environment
                Environment is initialized
                initialized=True error_message=None
                """)


@responses.activate
@patch("blueapi.client.client.time.sleep", return_value=None)
def test_env_timeout(mock_sleep: Mock, runner: CliRunner):
    # Setup mocked responses for the REST endpoints
    responses.add(
        responses.DELETE,
        "http://localhost:8000/environment",
        status=200,
        json=EnvironmentResponse(initialized=False).model_dump(),
    )
    # Add responses for each polling attempt, all indicating not initialized
    responses.add(
        responses.GET,
        "http://localhost:8000/environment",
        json=EnvironmentResponse(initialized=False).model_dump(),
        status=200,
    )

    # Run the command that should interact with these endpoints
    result = runner.invoke(main, ["controller", "env", "-r", "-t", "0.1"])
    if result.exception is not None:
        assert isinstance(result.exception, TimeoutError), "Expected a TimeoutError"
        assert (
            result.exception.args[0]
            == "Failed to reload the environment within 0.1 seconds, "
            "a server restart is recommended"
        )
    else:
        raise AssertionError("Expected an exception but got None")

    # First call should be DELETE
    assert responses.calls[0].request.method == "DELETE"
    assert responses.calls[0].request.url == "http://localhost:8000/environment"

    # Remaining calls should all be GET
    for call in responses.calls[1:]:  # Skip the first DELETE request
        assert call.request.method == "GET"
        assert call.request.url == "http://localhost:8000/environment"

    # Check the output for the timeout message
    assert result.output == "Reloading environment\n"
    assert (
        result.exit_code == 1
    )  # Assuming your command exits successfully even on timeout for simplicity


@responses.activate
def test_env_reload_server_side_error(runner: CliRunner):
    # Setup mocked error response from the server
    responses.add(
        responses.DELETE, "http://localhost:8000/environment", status=500, json={}
    )

    result = runner.invoke(main, ["controller", "env", "-r"])
    assert isinstance(
        result.exception, BlueskyRemoteControlError
    ), "Expected a BlueskyRemoteError from cli runner"
    assert result.exception.args[0] == "Failed to tear down the environment"

    # Check if the endpoints were hit as expected
    assert len(responses.calls) == 1  # +1 for the DELETE call

    # Only call should be DELETE
    assert responses.calls[0].request.method == "DELETE"
    assert responses.calls[0].request.url == "http://localhost:8000/environment"

    # Check the output for the timeout message
    # TODO this seems wrong but this is the current behaviour
    # There should be an error message
    assert result.output == "Reloading environment\n"

    assert result.exit_code == 1


@pytest.mark.parametrize(
    "exception, expected_exit_code",
    [
        (ValidationError.from_exception_data(title="Base model", line_errors=[]), 1),
        (BlueskyRemoteControlError("Server error"), 1),
        (ValueError("Error parsing parameters"), 1),
    ],
)
def test_error_handling(exception, expected_exit_code, runner: CliRunner):
    # Patching the create_task method to raise different exceptions
    with patch(
        "blueapi.client.rest.BlueapiRestClient.create_task", side_effect=exception
    ):
        result = runner.invoke(
            main,
            [
                "-c",
                "tests/example_yaml/valid_stomp_config.yaml",
                "controller",
                "run",
                "sleep",
                "'{\"time\": 5}'",
            ],
            input="\n",
        )
        assert result.exit_code == expected_exit_code


def test_device_output_formatting():
    """Test for alternative device output formats"""

    device = MyDevice("my-device")

    devices = DeviceResponse(devices=[DeviceModel.from_device(device)])

    compact = dedent("""\
                my-device
                    HasName
                """)

    _assert_matching_formatting(OutputFormat.COMPACT, devices, compact)

    json_out = dedent("""\
                [
                  {
                    "name": "my-device",
                    "protocols": [
                      "HasName"
                    ]
                  }
                ]
                """)
    _assert_matching_formatting(OutputFormat.JSON, devices, json_out)
    _ = json.loads(json_out)

    full = dedent("""\
            my-device
                HasName
            """)
    _assert_matching_formatting(OutputFormat.FULL, devices, full)


class ExtendedModel(BaseModel):
    name: str
    keys: list[int]
    metadata: None | Mapping[str, str] = None


def test_plan_output_formatting():
    """Test for alternative plan output formats"""

    plan = Plan(
        name="my-plan",
        description=dedent("""\
            Summary of description

            Rest of description
            """),
        model=ExtendedModel,
    )
    plans = PlanResponse(plans=[PlanModel.from_plan(plan)])

    compact = dedent("""\
                my-plan
                    Summary of description
                    Args
                      name=string (Required)
                      keys=[integer] (Required)
                      metadata=object
                """)

    _assert_matching_formatting(OutputFormat.COMPACT, plans, compact)

    json_out = dedent("""\
            [
              {
                "name": "my-plan",
                "description": "Summary of description\\n\\nRest of description\\n",
                "parameter_schema": {
                  "properties": {
                    "name": {
                      "title": "Name",
                      "type": "string"
                    },
                    "keys": {
                      "items": {
                        "type": "integer"
                      },
                      "title": "Keys",
                      "type": "array"
                    },
                    "metadata": {
                      "anyOf": [
                        {
                          "additionalProperties": {
                            "type": "string"
                          },
                          "type": "object"
                        },
                        {
                          "type": "null"
                        }
                      ],
                      "default": null,
                      "title": "Metadata"
                    }
                  },
                  "required": [
                    "name",
                    "keys"
                  ],
                  "title": "ExtendedModel",
                  "type": "object"
                }
              }
            ]
                """)
    _assert_matching_formatting(OutputFormat.JSON, plans, json_out)
    _ = json.loads(json_out)

    full = dedent("""\
        my-plan
            Summary of description

            Rest of description
            Schema
                {
                  "properties": {
                    "name": {
                      "title": "Name",
                      "type": "string"
                    },
                    "keys": {
                      "items": {
                        "type": "integer"
                      },
                      "title": "Keys",
                      "type": "array"
                    },
                    "metadata": {
                      "anyOf": [
                        {
                          "additionalProperties": {
                            "type": "string"
                          },
                          "type": "object"
                        },
                        {
                          "type": "null"
                        }
                      ],
                      "default": null,
                      "title": "Metadata"
                    }
                  },
                  "required": [
                    "name",
                    "keys"
                  ],
                  "title": "ExtendedModel",
                  "type": "object"
                }
            """)
    _assert_matching_formatting(OutputFormat.FULL, plans, full)


def test_event_formatting():
    data = DataEvent(
        name="start", doc={"foo": "bar", "fizz": {"buzz": (1, 2, 3), "hello": "world"}}
    )
    worker = WorkerEvent(
        state=WorkerState.RUNNING,
        task_status=TaskStatus(task_id="count", task_complete=False, task_failed=False),
        errors=[],
        warnings=[],
    )
    progress = ProgressEvent(task_id="start", statuses={})

    _assert_matching_formatting(
        OutputFormat.JSON,
        data,
        (
            """{"name": "start", "doc": """
            """{"foo": "bar", "fizz": {"buzz": [1, 2, 3], "hello": "world"}}}\n"""
        ),
    )
    _assert_matching_formatting(OutputFormat.COMPACT, data, "Data Event: start\n")
    _assert_matching_formatting(
        OutputFormat.FULL,
        data,
        dedent("""\
            Start:
                foo: bar
                fizz:
                    buzz: (1, 2, 3)
                    hello: world
            """),
    )

    _assert_matching_formatting(
        OutputFormat.JSON,
        worker,
        (
            """{"state": "RUNNING", "task_status": """
            """{"task_id": "count", "task_complete": false, "task_failed": false}, """
            """"errors": [], "warnings": []}\n"""
        ),
    )
    _assert_matching_formatting(OutputFormat.COMPACT, worker, "Worker Event: RUNNING\n")
    _assert_matching_formatting(
        OutputFormat.FULL,
        worker,
        "WorkerEvent: RUNNING\n    task_id: count\n",
    )

    _assert_matching_formatting(
        OutputFormat.JSON, progress, """{"task_id": "start", "statuses": {}}\n"""
    )
    _assert_matching_formatting(OutputFormat.COMPACT, progress, "Progress: ???%\n")
    _assert_matching_formatting(
        OutputFormat.FULL, progress, "Progress:\n    task_id: start\n"
    )


def test_unknown_object_formatting():
    demo = {"foo": 42, "bar": ["hello", "World"]}

    exp = """{"foo": 42, "bar": ["hello", "World"]}\n"""
    _assert_matching_formatting(OutputFormat.JSON, demo, exp)

    exp = """{'bar': ['hello', 'World'], 'foo': 42}\n"""
    _assert_matching_formatting(OutputFormat.COMPACT, demo, exp)

    _assert_matching_formatting(OutputFormat.FULL, demo, exp)


def test_dict_formatting():
    demo = {"name": "foo", "keys": [1, 2, 3], "metadata": {"fizz": "buzz"}}
    exp = """\nname: foo\nkeys: [1, 2, 3]\nmetadata:\n    fizz: buzz"""
    assert fmt_dict(demo, 0) == exp

    demo = "not a dict"
    assert fmt_dict(demo, 0) == " not a dict"


def test_generic_base_model_formatting():
    model = ExtendedModel(name="demo", keys=[1, 2, 3], metadata={"fizz": "buzz"})
    exp = '{"name": "demo", "keys": [1, 2, 3], "metadata": {"fizz": "buzz"}}\n'
    _assert_matching_formatting(OutputFormat.JSON, model, exp)

    _assert_matching_formatting(
        OutputFormat.FULL,
        model,
        dedent("""\
            ExtendedModel
                name: demo
                keys: [1, 2, 3]
                metadata:
                    fizz: buzz
            """),
    )


@patch("blueapi.cli.cli.setup_scratch")
def test_init_scratch_calls_setup_scratch(mock_setup_scratch: Mock, runner: CliRunner):
    expected_config = ScratchConfig(
        root=Path("/tmp"),
        repositories=[
            ScratchRepository(
                name="dodal",
                remote_url="https://github.com/DiamondLightSource/dodal.git",
            )
        ],
    )

    result = runner.invoke(
        main,
        ["-c", "tests/unit_tests/example_yaml/scratch.yaml", "setup-scratch"],
        input="\n",
    )
    assert result.exit_code == 0
    mock_setup_scratch.assert_called_once_with(expected_config)


def _assert_matching_formatting(fmt: OutputFormat, obj: Any, expected: str):
    output = StringIO()
    fmt.display(obj, output)
    assert expected == output.getvalue()


@responses.activate
def test_login_missing_config(runner: CliRunner):
    result = runner.invoke(main, ["login"])
    assert "Please provide configuration to login!" in result.output
    assert result.exit_code == 0


@responses.activate
def test_logout_missing_config(runner: CliRunner):
    result = runner.invoke(main, ["logout"])
    assert "Please provide configuration to logout!" in result.output
    assert result.exit_code == 0


@pytest.fixture
def valid_auth_config(tmp_path: Path) -> str:
    config = f"""
oauth:
  oidc_config_url: https://auth.example.com/realms/sample/.well-known/openid-configuration
cliAuth:
  client_id: sample-cli
  client_audience: sample-account
  token_file_path: {tmp_path}/token
"""
    with open(tmp_path / "auth_config.yaml", mode="w") as valid_auth_config_file:
        valid_auth_config_file.write(config)
        return valid_auth_config_file.name


@responses.activate
def test_login_success(runner: CliRunner, valid_auth_config: str):
    payload: dict[str, str] = {
        "name": "John Doe",
        "fedid": "jd1",
    }

    mock_json_responses: list[dict[str, str]] = [
        {
            "device_authorization_endpoint": "https://example.com/device_authorization",
            "authorization_endpoint": "https://example.com/authorization",
            "token_endpoint": "https://example.com/token",
            "issuer": "https://example.com",
            "jwks_uri": "https://example.com/realms/master/protocol/openid-connect/certs",
            "end_session_endpoint": "https://example.com/logout",
        },
        {
            "device_code": "device_code",
            "verification_uri_complete": "https://example.com/verify",
        },
        {
            "access_token": "token",
        },
    ]
    with responses.RequestsMock(assert_all_requests_are_fired=True) as requests_mock:
        requests_mock.add(
            requests_mock.GET,
            "https://auth.example.com/realms/sample/.well-known/openid-configuration",
            json=mock_json_responses[0],
            status=200,
        )
        requests_mock.add(
            requests_mock.POST,
            "https://example.com/device_authorization",
            json=mock_json_responses[1],
            status=200,
        )
        requests_mock.add(
            requests_mock.POST,
            "https://example.com/token",
            json=mock_json_responses[2],
            status=200,
        )
        with (
            patch("blueapi.service.Authenticator.decode_jwt") as mock_decode,
        ):
            mock_decode.return_value = payload
            result = runner.invoke(main, ["-c", valid_auth_config, "login"])
    assert (
        "Logging in\n"
        "Please login from this URL:- https://example.com/verify\n"
        f"Logged in as {payload['name']} with fed-id {payload['fedid']}\n"
        == result.output
    )
    assert result.exit_code == 0


@responses.activate
def test_token_login_early_exit(
    runner: CliRunner, valid_auth_config: str, tmp_path: Path
):
    with open(tmp_path / "token", "w") as token_file:
        # base64 encoded token
        token_file.write(
            base64.b64encode(
                b'{"access_token":"token","refresh_token":"refresh_token"}'
            ).decode("utf-8")
        )
    payload: dict[str, Any] = {
        "name": "John Doe",
        "fedid": "jd1",
    }

    mock_json_responses: list[dict[str, str]] = [
        {
            "device_authorization_endpoint": "https://example.com/device_authorization",
            "authorization_endpoint": "https://example.com/authorization",
            "token_endpoint": "https://example.com/token",
            "issuer": "https://example.com",
            "jwks_uri": "https://example.com/realms/master/protocol/openid-connect/certs",
            "end_session_endpoint": "https://example.com/logout",
        },
        {
            "access_token": "token",
        },
    ]
    with responses.RequestsMock(assert_all_requests_are_fired=True) as requests_mock:
        requests_mock.add(
            requests_mock.GET,
            "https://auth.example.com/realms/sample/.well-known/openid-configuration",
            json=mock_json_responses[0],
            status=200,
        )
        with (
            patch("blueapi.service.Authenticator.decode_jwt") as mock_decode,
        ):
            mock_decode.side_effect = [payload, payload]
            result = runner.invoke(main, ["-c", valid_auth_config, "login"])
    assert (
        "Logging in\n"
        f"Logged in as {payload['name']} with fed-id {payload['fedid']}\n"
        == result.output
    )
    assert result.exit_code == 0


@responses.activate
def test_login_with_refresh_token(
    runner: CliRunner, valid_auth_config: str, tmp_path: Path
):
    with open(tmp_path / "token", "w") as token_file:
        # base64 encoded token
        token_file.write(
            base64.b64encode(
                b'{"access_token":"token","refresh_token":"refresh_token"}'
            ).decode("utf-8")
        )
    payload: dict[str, Any] = {
        "name": "John Doe",
        "fedid": "jd1",
    }

    mock_json_responses: list[dict[str, str]] = [
        {
            "device_authorization_endpoint": "https://example.com/device_authorization",
            "authorization_endpoint": "https://example.com/authorization",
            "token_endpoint": "https://example.com/token",
            "issuer": "https://example.com",
            "jwks_uri": "https://example.com/realms/master/protocol/openid-connect/certs",
            "end_session_endpoint": "https://example.com/logout",
        },
        {
            "access_token": "token",
        },
    ]
    with responses.RequestsMock(assert_all_requests_are_fired=True) as requests_mock:
        requests_mock.add(
            requests_mock.GET,
            "https://auth.example.com/realms/sample/.well-known/openid-configuration",
            json=mock_json_responses[0],
            status=200,
        )
        requests_mock.add(
            requests_mock.POST,
            "https://example.com/token",
            json=mock_json_responses[1],
            status=200,
        )
        with (
            patch("blueapi.service.Authenticator.decode_jwt") as mock_decode,
        ):
            mock_decode.side_effect = [jwt.ExpiredSignatureError, payload]
            result = runner.invoke(main, ["-c", valid_auth_config, "login"])
    assert (
        "Logging in\n"
        f"Logged in as {payload['name']} with fed-id {payload['fedid']}\n"
        == result.output
    )
    assert result.exit_code == 0


@responses.activate
def test_login_edge_cases(runner: CliRunner, valid_auth_config: str, tmp_path: Path):
    with open(tmp_path / "token", "w") as token_file:
        # base64 encoded token
        token_file.write(
            base64.b64encode(
                b'{"access_token":"token","refresh_token":"refresh_token"}'
            ).decode("utf-8")
        )

    mock_json_responses: list[dict[str, str]] = [
        {
            "device_authorization_endpoint": "https://example.com/device_authorization",
            "authorization_endpoint": "https://example.com/authorization",
            "token_endpoint": "https://example.com/token",
            "issuer": "https://example.com",
            "jwks_uri": "https://example.com/realms/master/protocol/openid-connect/certs",
            "end_session_endpoint": "https://example.com/logout",
        },
        {
            "details": "not found",
        },
    ]
    with responses.RequestsMock(assert_all_requests_are_fired=True) as requests_mock:
        requests_mock.add(
            requests_mock.GET,
            "https://auth.example.com/realms/sample/.well-known/openid-configuration",
            json=mock_json_responses[0],
            status=200,
        )
        requests_mock.add(
            requests_mock.POST,
            "https://example.com/token",
            json=mock_json_responses[1],
            status=400,
        )
        requests_mock.add(
            requests_mock.POST,
            "https://example.com/device_authorization",
            json=mock_json_responses[1],
            status=400,
        )
        with (
            patch("blueapi.service.Authenticator.decode_jwt") as mock_decode,
        ):
            mock_decode.side_effect = jwt.ExpiredSignatureError
            result = runner.invoke(main, ["-c", valid_auth_config, "login"])
    assert "Logging in\n" == result.output
    assert result.exit_code == 0


@responses.activate
def test_logout_success(runner: CliRunner, valid_auth_config: str, tmp_path: Path):
    with open(tmp_path / "token", "w") as token_file:
        # base64 encoded token
        token_file.write(base64.b64encode(b'{"access_token":"token"}').decode("utf-8"))
    response = responses.add(
        responses.GET,
        "https://auth.example.com/realms/sample/.well-known/openid-configuration",
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
    assert tmp_path.joinpath("token").exists() is True
    result = runner.invoke(main, ["-c", valid_auth_config, "logout"])
    assert "Logged out" in result.output
    assert result.exit_code == 0
    assert response.call_count == 1
    assert tmp_path.joinpath("token").exists() is False
