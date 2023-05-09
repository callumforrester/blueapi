from dataclasses import dataclass

import pytest
from click.testing import CliRunner
from fastapi.testclient import TestClient
from mock import Mock, patch
from pydantic import BaseModel

from blueapi import __version__
from blueapi.cli.cli import main
from blueapi.core.bluesky_types import Plan
from blueapi.service.handler import Handler


@pytest.fixture
def runner():
    return CliRunner()


def test_cli_version(runner: CliRunner):
    result = runner.invoke(main, ["--version"])

    assert result.stdout == f"blueapi, version {__version__}\n"


def test_main_no_params():
    runner = CliRunner()
    result = runner.invoke(main)
    expected = "Please invoke subcommand!\n"

    assert result.stdout == expected


def test_main_with_nonexistent_config_file():
    runner = CliRunner()
    result = runner.invoke(main, ["-c", "tests/non_existent.yaml"])

    result.exit_code == 1
    type(result.exception) == FileNotFoundError


def test_controller_plans():
    runner = CliRunner()
    result = runner.invoke(main, ["controller", "plans"])

    assert result.stdout == "Failed to establish connection to FastAPI server.\n"


# Some CLI commands require the rest api to be running...


class MyModel(BaseModel):
    id: str


@dataclass
class MyDevice:
    name: str


@patch("blueapi.service.handler.Handler")
def test_deprecated_worker_command(
    mock_handler: Mock, handler: Handler, runner: CliRunner
):
    mock_handler.side_effect = Mock(return_value=handler)

    with patch("uvicorn.run", side_effect=None):
        result = runner.invoke(main, ["worker"])

    assert result.output == (
        "DeprecationWarning: The command 'worker' is deprecated.\n"
        + "Please use run command instead.\n\n"
    )


@patch("blueapi.service.handler.Handler")
@patch("requests.get")
def test_get_plans_and_devices(
    mock_requests: Mock,
    mock_handler: Mock,
    handler: Handler,
    client: TestClient,
    runner: CliRunner,
):
    """Integration test to test get_plans and get_devices."""

    # needed so that the handler is instantiated as MockHandler() instead of Handler().
    mock_handler.side_effect = Mock(return_value=handler)

    # Setup the (Mock)Handler.
    with patch("uvicorn.run", side_effect=None):
        result = runner.invoke(main, ["serve"])

    assert result.exit_code == 0

    # Put a plan in handler.context manually.
    plan = Plan(name="my-plan", model=MyModel)
    handler.context.plans = {"my-plan": plan}

    # Setup requests.get call to return the output of the FastAPI call for plans.
    # Call the CLI function and check the output.
    mock_requests.return_value = client.get("/plans")
    plans = runner.invoke(main, ["controller", "plans"])

    assert plans.output == (
        "Response returned with 200: \n{'plans': [{'name': 'my-plan'}]}\n"
    )

    # Setup requests.get call to return the output of the FastAPI call for devices.
    # Call the CLI function and check the output - expect nothing as no devices set.
    handler.context.devices = {}
    mock_requests.return_value = client.get("/devices")
    unset_devices = runner.invoke(main, ["controller", "devices"])
    assert unset_devices.output == "Response returned with 200: \n{'devices': []}\n"

    # Put a device in handler.context manually.
    device = MyDevice("my-device")
    handler.context.devices = {"my-device": device}

    # Setup requests.get call to return the output of the FastAPI call for devices.
    # Call the CLI function and check the output.
    mock_requests.return_value = client.get("/devices")
    devices = runner.invoke(main, ["controller", "devices"])

    assert devices.output == (
        "Response returned with 200: "
        + "\n{'devices': [{'name': 'my-device', 'protocols': ['HasName']}]}\n"
    )


def test_invalid_config_path_handling(runner: CliRunner):
    # test what happens if you pass an invalid config file...
    result = runner.invoke(main, ["-c", "non_existent.yaml"])
    assert result.exit_code == 1


@patch("blueapi.service.handler.Handler")
@patch("requests.put")
def test_config_passed_down_to_command_children(
    mock_requests: Mock,
    mock_handler: Mock,
    handler: Handler,
    runner: CliRunner,
):
    mock_handler.side_effect = Mock(return_value=handler)
    config_path = "tests/example_yaml/rest_config.yaml"

    with patch("uvicorn.run", side_effect=None):
        result = runner.invoke(main, ["-c", config_path, "serve"])

    assert result.exit_code == 0

    mock_requests.return_value = Mock()

    runner.invoke(
        main, ["-c", config_path, "controller", "run", "sleep", "-p", '{"time": 5}']
    )

    assert mock_requests.call_args[0][0] == "http://a.fake.host:12345/task/sleep"
    assert mock_requests.call_args[1] == {
        "json": {"name": "sleep", "params": {"time": 5}}
    }
