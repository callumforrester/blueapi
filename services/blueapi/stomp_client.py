import inspect
import itertools
import json
import logging
import time
import uuid
from collections.abc import Callable
from dataclasses import dataclass
from threading import Event
from typing import Any

import stomp
from pydantic import BaseModel, parse_obj_as
from services.bluecommon.context import MessageContext
from services.bluecommon.thread_exception import handle_all_exceptions
from stomp.exception import ConnectFailedException
from stomp.utils import Frame

from blueapi.config import BasicAuthentication, StompConfig


def serialize(obj: Any) -> Any:
    """
    Pydantic-aware serialization routine that can also be
    used on primitives. So serialize(4) is 4, but
    serialize(<model>) is a dictionary.

    Args:
        obj: The object to serialize

    Returns:
        Any: The serialized object
    """

    if isinstance(obj, BaseModel):
        # Serialize by alias so that our camelCase models leave the service
        # with camelCase field names
        return obj.dict(by_alias=True)
    elif hasattr(obj, "__pydantic_model__"):
        return serialize(obj.__pydantic_model__)
    else:
        return obj


MessageListener = Callable[[MessageContext, Any], None]
LOGGER = logging.getLogger(__name__)

CORRELATION_ID_HEADER = "correlation-id"


def determine_deserialization_type(
    listener: MessageListener, default: type = str
) -> type:
    """
    Inspect a message listener function to determine the type to deserialize
    a message to

    Args:
        listener (MessageListener): The function that takes a deserialized message
        default (Type, optional): If the type cannot be determined, what default
                                  should we fall back on? Defaults to str.

    Returns:
        Type: _description_
    """

    _, message = inspect.signature(listener).parameters.values()
    a_type = message.annotation
    if a_type is not inspect.Parameter.empty:
        return a_type
    else:
        return default


class StompDestinationProvider:
    """
    Destination provider for stomp, stateless so just
    uses naming conventions
    """

    def queue(self, name: str) -> str:
        return f"/queue/{name}"

    def topic(self, name: str) -> str:
        return f"/topic/{name}"

    def temporary_queue(self, name: str) -> str:
        return f"/temp-queue/{name}"

    default = queue


@dataclass
class StompReconnectPolicy:
    """
    Details of how often stomp will try to reconnect if connection is unexpectedly lost
    """

    initial_delay: float = 0.0
    attempt_period: float = 10.0


@dataclass
class Subscription:
    """
    Details of a subscription, the template needs its own representation to
    defer subscriptions until after connection
    """

    destination: str
    callback: Callable[[Frame], None]


class StompClient:
    """
    StompClient for use with ActiveMQ.
    """

    _conn: stomp.Connection
    _reconnect_policy: StompReconnectPolicy
    _authentication: BasicAuthentication
    _sub_num: itertools.count
    _listener: stomp.ConnectionListener
    _subscriptions: dict[str, Subscription]
    _pending_subscriptions: set[str]
    _disconnected: Event

    # Stateless implementation means attribute can be static
    _destination_provider = StompDestinationProvider()

    def __init__(
        self,
        conn: stomp.Connection,
        reconnect_policy: StompReconnectPolicy | None = None,
        authentication: BasicAuthentication | None = None,
    ) -> None:
        self._conn = conn
        self._reconnect_policy = reconnect_policy or StompReconnectPolicy()
        self._authentication = authentication or BasicAuthentication()

        self._sub_num = itertools.count()
        self._listener = stomp.ConnectionListener()

        self._listener.on_message = self._on_message
        self._conn.set_listener("", self._listener)

        self._subscriptions = {}

    @classmethod
    def autoconfigured(cls, config: StompConfig):
        return cls(
            stomp.Connection(
                [(config.host, config.port)],
                auto_content_length=False,
            ),
            authentication=config.auth,
        )

    @property
    def destinations(self):
        return self._destination_provider

    def send(
        self,
        destination: str,
        obj: Any,
        on_reply: MessageListener | None = None,
        correlation_id: str | None = None,
    ) -> None:
        self._send_str(
            destination, json.dumps(serialize(obj)), on_reply, correlation_id
        )

    def _send_str(
        self,
        destination: str,
        message: str,
        on_reply: MessageListener | None = None,
        correlation_id: str | None = None,
    ) -> None:
        LOGGER.info(f"SENDING {message} to {destination}")

        headers: dict[str, Any] = {"JMSType": "TextMessage"}
        if on_reply is not None:
            reply_queue_name = self.destinations.temporary_queue(str(uuid.uuid1()))
            headers = {**headers, "reply-to": reply_queue_name}
            self.subscribe(reply_queue_name, on_reply)
        if correlation_id:
            headers = {**headers, CORRELATION_ID_HEADER: correlation_id}
        self._conn.send(headers=headers, body=message, destination=destination)

    def subscribe(self, destination: str, callback: MessageListener) -> None:
        LOGGER.debug(f"New subscription to {destination}")
        obj_type = determine_deserialization_type(callback, default=str)

        def wrapper(frame: Frame) -> None:
            as_dict = json.loads(frame.body)
            value: Any = parse_obj_as(obj_type, as_dict)

            context = MessageContext(
                frame.headers["destination"],
                frame.headers.get("reply-to"),
                frame.headers.get(CORRELATION_ID_HEADER),
            )
            callback(context, value)

        sub_id = (
            destination
            if destination.startswith("/temp-queue/")
            else str(next(self._sub_num))
        )
        self._subscriptions[sub_id] = Subscription(destination, wrapper)
        # If we're connected, subscribe immediately, otherwise the subscription is
        # deferred until connection.
        self._ensure_subscribed([sub_id])

    def connect(self) -> None:
        if self._conn.is_connected():
            return

        connected: Event = Event()

        def finished_connecting(_: Frame):
            connected.set()

        self._listener.on_connected = finished_connecting
        self._listener.on_disconnected = self._on_disconnected

        LOGGER.info("Connecting...")

        try:
            self._conn.connect(
                username=self._authentication.username,
                passcode=self._authentication.passcode,
                wait=True,
            )
            connected.wait()
        except ConnectFailedException as ex:
            LOGGER.exception(msg="Failed to connect to message bus", exc_info=ex)

        self._ensure_subscribed()

    def _ensure_subscribed(self, sub_ids: list[str] | None = None) -> None:
        # We must defer subscription until after connection, because stomp literally
        # sends a SUB to the broker. But it still nice to be able to call subscribe
        # on template before it connects, then just run the subscribes after connection.
        if self._conn.is_connected():
            for sub_id in sub_ids or self._subscriptions.keys():
                sub = self._subscriptions[sub_id]
                LOGGER.info(f"Subscribing to {sub.destination}")
                self._conn.subscribe(destination=sub.destination, id=sub_id, ack="auto")

    def disconnect(self) -> None:
        LOGGER.info("Disconnecting...")
        if not self.is_connected():
            LOGGER.info("Already disconnected")
            return
        # We need to synchronise the disconnect on an event because the stomp Connection
        # object doesn't do it for us
        disconnected = Event()
        self._listener.on_disconnected = disconnected.set
        self._conn.disconnect()
        disconnected.wait()
        self._listener.on_disconnected = None

    @handle_all_exceptions
    def _on_disconnected(self) -> None:
        LOGGER.warn(
            "Stomp connection lost, will attempt reconnection with "
            f"policy {self._reconnect_policy}"
        )
        time.sleep(self._reconnect_policy.initial_delay)
        while not self._conn.is_connected():
            try:
                self.connect()
            except ConnectFailedException:
                LOGGER.exception("Reconnect failed")
            time.sleep(self._reconnect_policy.attempt_period)

    @handle_all_exceptions
    def _on_message(self, frame: Frame) -> None:
        LOGGER.info(f"Received {frame}")
        sub_id = frame.headers.get("subscription")
        sub = self._subscriptions.get(sub_id)
        if sub is not None:
            sub.callback(frame)
        else:
            LOGGER.warn(f"No subscription active for id: {sub_id}")

    def is_connected(self) -> bool:
        return self._conn.is_connected()
