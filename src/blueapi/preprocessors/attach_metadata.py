from typing import List

import bluesky.plan_stubs as bps
from bluesky.utils import make_decorator
from dodal.parameters.gda_directory_provider import VisitDirectoryProvider

from blueapi.core import MsgGenerator

DATA_SESSION = "data_session"
DATA_GROUPS = "data_groups"


def attach_metadata(
    plan: MsgGenerator,
    provider: VisitDirectoryProvider,
) -> MsgGenerator:
    """Updates a directory provider default location for file storage."""
    staging = False

    messages = list(plan)
    will_write_data = "open_run" in [msg.command for msg in messages]
    remade_plan = (msg for msg in messages)

    for message in remade_plan:
        if (message.command == "stage") and (not staging and will_write_data):
            yield from bps.wait_for([provider.update])
            staging = True
        elif message.command == "unstage":
            staging = False

        if message.command == "open_run":
            directory_info = provider()
            message.kwargs[DATA_SESSION] = directory_info.filename_prefix

        yield message


attach_metadata_decorator = make_decorator(attach_metadata)
