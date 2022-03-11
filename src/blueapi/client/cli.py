import asyncio
import json
import logging
from pathlib import Path
from pydoc import cli
from typing import Tuple

import click

from blueapi import __version__

from .rest import RestClient


@click.group(invoke_without_command=True)
@click.option(
    "-u",
    "--url",
    type=str,
    help="REST API URL",
    default="http://localhost:8080",
)
@click.version_option(version=__version__)
@click.pass_context
def main(ctx, url: str) -> None:
    # if no command is supplied, run with the options passed
    if ctx.invoked_subcommand is None:
        print("Please invoke subcommand!")
    ctx.ensure_object(dict)
    ctx.obj["rest_client"] = RestClient(url)


@main.command(name="plans")
@click.pass_context
def get_plans(ctx) -> None:
    client: RestClient = ctx.obj["rest_client"]
    print(asyncio.run(client.get_plans()))


@main.command(name="run")
@click.pass_context
@click.argument("name", type=str, nargs=1)
@click.option(
    "-p",
    "--parameters",
    type=str,
    help='JSON-encoded parameters, e.g. \{"foo": 1, "bar": 2}',
)
def get_plans(ctx, name: str, parameters: str) -> None:
    parameters_dict = json.loads(parameters) if parameters is not None else {}
    client: RestClient = ctx.obj["rest_client"]
    print(asyncio.run(client.run_plan(name, parameters_dict)))
