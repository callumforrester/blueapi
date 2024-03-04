from typing import Any, Iterable, List, Optional, TypeVar, get_type_hints

from bluesky.protocols import HasName, Movable
from pydantic import Field

from blueapi.core import BLUESKY_PROTOCOLS, Device, Plan
from blueapi.utils import BlueapiBaseModel
from blueapi.worker import Worker, WorkerState

_UNKNOWN_NAME = "UNKNOWN"


T = TypeVar("T")


class MovableModel(BlueapiBaseModel):
    # TODO: Minimum, Maximum, EnumValues
    type: str = Field(description="Python type that values may be of, float, int, etc.")


class DeviceModel(BlueapiBaseModel):
    """
    Representation of a device
    """

    name: str = Field(description="Name of the device")
    protocols: List[str] = Field(
        description="Protocols that a device conforms to, indicating its capabilities"
    )
    movable_type: Optional[MovableModel] = Field(
        description="Type of value device may be moved to. None if Device not Movable",
        default=None,
    )

    @classmethod
    def from_device(cls, device: Device) -> "DeviceModel":
        name = device.name if isinstance(device, HasName) else _UNKNOWN_NAME
        protocols = list(_protocol_names(device))

        type = (
            get_type_hints(device.set).get("return")
            if isinstance(device, Movable)
            else None
        )
        movable_model = None if type is None else MovableModel(type=type)

        return cls(
            name=name,
            protocols=protocols,
            movable_type=movable_model,
        )


def _protocol_names(device: Device) -> Iterable[str]:
    for protocol in BLUESKY_PROTOCOLS:
        if isinstance(device, protocol):
            yield protocol.__name__


class DeviceRequest(BlueapiBaseModel):
    """
    A query for devices
    """

    ...


class DeviceResponse(BlueapiBaseModel):
    """
    Response to a query for devices
    """

    devices: List[DeviceModel] = Field(description="Devices available to use in plans")


class PlanModel(BlueapiBaseModel):
    """
    Representation of a plan
    """

    name: str = Field(description="Name of the plan")
    description: Optional[str] = Field(
        description="Docstring of the plan", default=None
    )
    parameter_schema: Optional[dict[str, Any]] = Field(
        description="Schema of the plan's parameters",
        alias="schema",
        default_factory=dict,
    )

    @classmethod
    def from_plan(cls, plan: Plan) -> "PlanModel":
        return cls(
            name=plan.name,
            schema=plan.model.schema(),
            description=plan.description,
        )


class PlanRequest(BlueapiBaseModel):
    """
    A query for plans
    """

    ...


class PlanResponse(BlueapiBaseModel):
    """
    Response to a query for plans
    """

    plans: List[PlanModel] = Field(description="Plans available to use by a worker")


class TaskResponse(BlueapiBaseModel):
    """
    Acknowledgement that a task has started, includes its ID
    """

    task_id: str = Field(description="Unique identifier for the task")


class WorkerTask(BlueapiBaseModel):
    """
    Worker's active task ID, can be None
    """

    task_id: Optional[str] = Field(
        description="The ID of the current task, None if the worker is idle"
    )

    @classmethod
    def of_worker(cls, worker: Worker) -> "WorkerTask":
        active = worker.get_active_task()
        if active is not None:
            return WorkerTask(task_id=active.task_id)
        else:
            return WorkerTask(task_id=None)


class StateChangeRequest(BlueapiBaseModel):
    """
    Request to change the state of the worker.
    """

    new_state: WorkerState = Field()
    defer: Optional[bool] = Field(
        description="Should worker defer Pausing until the next checkpoint",
        default=False,
    )
    reason: Optional[str] = Field(
        description="The reason for the current run to be aborted",
        default=None,
    )


class EnvironmentResponse(BlueapiBaseModel):
    """
    State of internal environment.
    """

    initialized: bool = Field(description="blueapi context initialized")
