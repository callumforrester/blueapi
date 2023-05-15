from typing import List

from bluesky.protocols import Movable, Readable
from ophyd import Component
from ophyd.sim import Syn2DGauss, SynGauss, SynSignal

from blueapi.plans import count, move

from ..core import MsgGenerator
from .simmotor import BrokenSynAxis, SynAxisWithMotionEvents


def x(name="x") -> SynAxisWithMotionEvents:
    return SynAxisWithMotionEvents(name=name, delay=1.0, events_per_move=8)


def y(name="y") -> SynAxisWithMotionEvents:
    return SynAxisWithMotionEvents(name=name, delay=3.0, events_per_move=24)


def z(name="z") -> SynAxisWithMotionEvents:
    return SynAxisWithMotionEvents(name=name, delay=2.0, events_per_move=16)


def theta(name="theta") -> SynAxisWithMotionEvents:
    return SynAxisWithMotionEvents(
        name=name, delay=0.2, events_per_move=12, egu="degrees"
    )


def x_err(name="x_err") -> BrokenSynAxis:
    return BrokenSynAxis(name=name, timeout=1.0)


def sample_pressure(name="sample_pressure") -> SynAxisWithMotionEvents:
    return SynAxisWithMotionEvents(
        name=name, delay=30.0, events_per_move=128, egu="MPa", value=0.101
    )


def sample_temperature(
    x: SynAxisWithMotionEvents,
    y: SynAxisWithMotionEvents,
    z: SynAxisWithMotionEvents,
    name="sample_temperature",
) -> SynSignal:
    return SynSignal(
        func=lambda: ((x.position + y.position + z.position) / 1000.0) + 20.0,
        name=name,
    )


def image_det(
    x: SynAxisWithMotionEvents,
    y: SynAxisWithMotionEvents,
    name="image_det",
) -> Syn2DGauss:
    return Syn2DGauss(
        name=name,
        motor0=x,
        motor_field0="x",
        motor1=y,
        motor_field1="y",
        center=(0, 0),
        Imax=1,
        labels={"detectors"},
    )


def current_det(
    x: SynAxisWithMotionEvents,
    name="current_det",
) -> SynGauss:
    return SynGauss(
        name=name,
        motor=x,
        motor_field="x",
        center=0.0,
        Imax=1,
        labels={"detectors"},
    )


def stp_snapshot(
    detectors: List[Readable],
    temperature: Movable = Component(Movable, "sample_temperature"),
    pressure: Movable = Component(Movable, "sample_pressure"),
) -> MsgGenerator:
    """
    Moves devices for pressure and temperature (defaults fetched from the context)
    and captures a single frame from a collection of devices

    Args:
        detectors (List[Readable]): A list of devices to read while the sample is at STP
        temperature (Optional[Movable]): A device controlling temperature of the sample,
            defaults to fetching a device name "sample_temperature" from the context
        pressure (Optional[Movable]): A device controlling pressure on the sample,
            defaults to fetching a device name "sample_pressure" from the context

    Returns:
        MsgGenerator: Plan

    Yields:
        Iterator[MsgGenerator]: Bluesky messages
    """
    yield from move({temperature: 0, pressure: 10**5})
    yield from count(detectors, 1)
