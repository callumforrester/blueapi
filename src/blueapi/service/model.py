from typing import Iterable, List

from bluesky.protocols import HasName
from pydantic import BaseModel, Field

from blueapi.core import BLUESKY_PROTOCOLS, Device, Plan

_UNKNOWN_NAME = "UNKNOWN"


class DeviceModel(BaseModel):
    """
    Representation of a device
    """

    name: str = Field(description="Name of the device")
    protocols: List[str] = Field(
        description="Protocols that a device conforms to, indicating its capabilities"
    )

    @classmethod
    def from_device(cls, device: Device) -> "DeviceModel":
        name = device.name if isinstance(device, HasName) else _UNKNOWN_NAME
        return cls(name=name, protocols=list(_protocol_names(device)))


def _protocol_names(device: Device) -> Iterable[str]:
    for protocol in BLUESKY_PROTOCOLS:
        if isinstance(device, protocol):
            yield protocol.__name__


class DeviceRequest(BaseModel):
    """
    A query for devices
    """

    ...


class DeviceResponse(BaseModel):
    """
    Response to a query for devices
    """

    devices: List[DeviceModel] = Field(description="Devices available to use in plans")


class PlanModel(BaseModel):
    """
    Representation of a plan
    """

    name: str = Field(description="Name of the plan")

    @classmethod
    def from_plan(cls, plan: Plan) -> "PlanModel":
        return cls(name=plan.name)


class PlanRequest(BaseModel):
    """
    A query for plans
    """

    ...


class PlanResponse(BaseModel):
    """
    Response to a query for plans
    """

    plans: List[PlanModel] = Field(description="Plans available to use by a worker")


class TaskResponse(BaseModel):
    """
    Acknowledgement that a task has started, includes its ID
    """

    task_name: str = Field(description="Unique identifier for the task")
