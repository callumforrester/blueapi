import logging
from collections.abc import Mapping
from functools import lru_cache
from typing import Any

from observability_utils import SpanKind, get_tracer
from opentelemetry.propagate import get_global_textmap

from blueapi.config import ApplicationConfig
from blueapi.core.context import BlueskyContext
from blueapi.core.event import EventStream
from blueapi.messaging.base import MessagingTemplate
from blueapi.messaging.stomptemplate import StompMessagingTemplate
from blueapi.service.model import DeviceModel, PlanModel, WorkerTask
from blueapi.worker.event import TaskStatusEnum, WorkerState
from blueapi.worker.reworker import TaskWorker
from blueapi.worker.task import Task
from blueapi.worker.worker import TrackableTask, Worker

"""This module provides interface between web application and underlying Bluesky
context and worker"""

TRACER = get_tracer("interface")


_CONFIG: ApplicationConfig = ApplicationConfig()


def config() -> ApplicationConfig:
    return _CONFIG


def set_config(new_config: ApplicationConfig):
    global _CONFIG

    _CONFIG = new_config


@lru_cache
def context() -> BlueskyContext:
    ctx = BlueskyContext()
    ctx.with_config(config().env)
    return ctx


@lru_cache
def worker() -> Worker:
    worker = TaskWorker(
        context(),
        broadcast_statuses=config().env.events.broadcast_status_events,
    )
    worker.start()
    return worker


@lru_cache
def messaging_template() -> MessagingTemplate | None:
    stomp_config = config().stomp
    if stomp_config is not None:
        template = StompMessagingTemplate.autoconfigured(stomp_config)

        task_worker = worker()
        event_topic = template.destinations.topic("public.worker.event")

        _publish_event_streams(
            {
                task_worker.worker_events: event_topic,
                task_worker.progress_events: event_topic,
                task_worker.data_events: event_topic,
            }
        )
        template.connect()
        return template
    else:
        return None


def setup(config: ApplicationConfig) -> None:
    """Creates and starts a worker with supplied config"""

    set_config(config)

    # Eagerly initialize worker and messaging connection

    logging.basicConfig(level=config.logging.level)
    worker()
    messaging_template()


def teardown() -> None:
    worker().stop()
    if (template := messaging_template()) is not None:
        template.disconnect()
    context.cache_clear()
    worker.cache_clear()
    messaging_template.cache_clear()


def _publish_event_streams(streams_to_destinations: Mapping[EventStream, str]) -> None:
    for stream, destination in streams_to_destinations.items():
        _publish_event_stream(stream, destination)


def _publish_event_stream(stream: EventStream, destination: str) -> None:
    def forward_message(event: Any, correlation_id: str | None) -> None:
        if (template := messaging_template()) is not None:
            template.send(destination, event, None, correlation_id)

    stream.subscribe(forward_message)


@TRACER.start_as_current_span("get_plans", kind=SpanKind.SERVER)
def get_plans() -> list[PlanModel]:
    """Get all available plans in the BlueskyContext"""
    return [PlanModel.from_plan(plan) for plan in context().plans.values()]


@TRACER.start_as_current_span("get_plan", kind=SpanKind.SERVER)
def get_plan(name: str) -> PlanModel:
    """Get plan by name from the BlueskyContext"""
    return PlanModel.from_plan(context().plans[name])


@TRACER.start_as_current_span("get_devices", kind=SpanKind.SERVER)
def get_devices() -> list[DeviceModel]:
    """Get all available devices in the BlueskyContext"""
    return [DeviceModel.from_device(device) for device in context().devices.values()]


@TRACER.start_as_current_span("get_device", kind=SpanKind.SERVER)
def get_device(name: str) -> DeviceModel:
    """Retrieve device by name from the BlueskyContext"""
    return DeviceModel.from_device(context().devices[name])


@TRACER.start_as_current_span("submit_task", kind=SpanKind.SERVER)
def submit_task(task: Task) -> str:
    """Submit a task to be run on begin_task"""
    return worker().submit_task(task, propagate_observability_context())


@TRACER.start_as_current_span("clear_task", kind=SpanKind.SERVER)
def clear_task(task_id: str) -> str:
    """Remove a task from the worker"""
    return worker().clear_task(task_id, propagate_observability_context())


@TRACER.start_as_current_span("begin_task", kind=SpanKind.SERVER)
def begin_task(task: WorkerTask) -> WorkerTask:
    """Trigger a task. Will fail if the worker is busy"""
    if task.task_id is not None:
        worker().begin_task(task.task_id, propagate_observability_context())
    return task


@TRACER.start_as_current_span("get_task_by_status", kind=SpanKind.SERVER)
def get_tasks_by_status(status: TaskStatusEnum) -> list[TrackableTask]:
    """Retrieve a list of tasks based on their status."""
    return worker().get_tasks_by_status(
        status, propagate_observability_context()
    )


@TRACER.start_as_current_span("get_active_task", kind=SpanKind.SERVER)
def get_active_task() -> TrackableTask | None:
    """Task the worker is currently running"""
    return worker().get_active_task(propagate_observability_context())


@TRACER.start_as_current_span("get_worker_state", kind=SpanKind.SERVER)
def get_worker_state() -> WorkerState:
    """State of the worker"""
    return worker().state


@TRACER.start_as_current_span("pause_worker", kind=SpanKind.SERVER)
def pause_worker(defer: bool | None) -> None:
    """Command the worker to pause"""
    worker().pause(defer, propagate_observability_context())


@TRACER.start_as_current_span("resume_worker", kind=SpanKind.SERVER)
def resume_worker() -> None:
    """Command the worker to resume"""
    worker().resume(propagate_observability_context())


@TRACER.start_as_current_span("cancel_active_task", kind=SpanKind.SERVER)
def cancel_active_task(failure: bool, reason: str | None) -> str:
    """Remove the currently active task from the worker if there is one
    Returns the task_id of the active task"""
    return worker().cancel_active_task(failure, reason)


@TRACER.start_as_current_span("get_tasks", kind=SpanKind.SERVER)
def get_tasks() -> list[TrackableTask]:
    """Return a list of all tasks on the worker,
    any one of which can be triggered with begin_task"""
    return worker().get_tasks()


@TRACER.start_as_current_span("get_task_by_id", kind=SpanKind.SERVER)
def get_task_by_id(task_id: str) -> TrackableTask | None:
    """Returns a task matching the task ID supplied,
    if the worker knows of it"""
    return worker().get_task_by_id(task_id)

def propagate_observability_context() -> dict[str, Any]:
    carr = {}
    tm = get_global_textmap()

    tm.inject(carr)
    return carr
