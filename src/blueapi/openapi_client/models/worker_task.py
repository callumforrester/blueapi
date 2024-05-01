# coding: utf-8

"""
    BlueAPI Control

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

    The version of the OpenAPI document: 0.0.5
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""  # noqa: E501


from __future__ import annotations
import pprint
import re  # noqa: F401
import json


from typing import Optional
from pydantic import BaseModel, Field, StrictStr


class WorkerTask(BaseModel):
    """
    Worker's active task ID, can be None  # noqa: E501
    """

    task_id: Optional[StrictStr] = Field(
        default=None,
        description="The ID of the current task, None if the worker is idle",
    )
    __properties = ["task_id"]

    class Config:
        """Pydantic configuration"""

        allow_population_by_field_name = True
        validate_assignment = True

    def to_str(self) -> str:
        """Returns the string representation of the model using alias"""
        return pprint.pformat(self.dict(by_alias=True))

    def to_json(self) -> str:
        """Returns the JSON representation of the model using alias"""
        return json.dumps(self.to_dict())

    @classmethod
    def from_json(cls, json_str: str) -> WorkerTask:
        """Create an instance of WorkerTask from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self):
        """Returns the dictionary representation of the model using alias"""
        _dict = self.dict(by_alias=True, exclude={}, exclude_none=True)
        return _dict

    @classmethod
    def from_dict(cls, obj: dict) -> WorkerTask:
        """Create an instance of WorkerTask from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return WorkerTask.parse_obj(obj)

        _obj = WorkerTask.parse_obj({"task_id": obj.get("task_id")})
        return _obj
