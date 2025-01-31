import importlib
from collections.abc import Iterable
from types import ModuleType
from typing import Any


def load_module_all(mod: ModuleType) -> Iterable[Any]:
    """
    If __export__ is defined for the module, try importing those functions as plans,
    else load the global variables exported via the `__all__` magic variable.
    Dynamic equivalent to `from my_module import *`. Use everything that doesn't start
    with `_` if the module doesn't have an `__all__`.

    from importlib import import_module

    mod = import_module("example.hello")
    variables = load_module_all(mod)

    Args:
        mod (ModuleType): The module to extract globals from

    Yields:
        Iterator[Iterable[Any]]: Each successive variable in globals
    """

    def get_named_subset(names: list[str]):
        for name in names:
            yield getattr(mod, name)

    if "__export__" in mod.__dict__:
        yield from get_named_subset(mod.__dict__["__export__"])
    elif "__all__" in mod.__dict__:
        yield from get_named_subset(mod.__dict__["__all__"])
    else:
        for name, value in mod.__dict__.items():
            if not name.startswith("_"):
                yield value


def is_function_sourced_from_module(obj: Any, module: ModuleType) -> bool:
    """
    Check if an object is originally from a particular module, useful to detect
    whether it actually comes from a nested import.

    Args:
        obj: Object to check
        module: Module to check against object
    """
    return (
        hasattr(obj, "__module__") and importlib.import_module(obj.__module__) is module
    )
