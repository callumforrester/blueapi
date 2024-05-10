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


from typing import List
from pydantic import BaseModel, Field, StrictStr, conlist


class DeviceModel(BaseModel):
    """
    Representation of a device  # noqa: E501
    """

    name: StrictStr = Field(default=..., description="Name of the device")
    protocols: conlist(StrictStr) = Field(
        default=...,
        description="Protocols that a device conforms to, indicating its capabilities",
    )
    __properties = ["name", "protocols"]

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
    def from_json(cls, json_str: str) -> DeviceModel:
        """Create an instance of DeviceModel from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self):
        """Returns the dictionary representation of the model using alias"""
        _dict = self.dict(by_alias=True, exclude={}, exclude_none=True)
        return _dict

    @classmethod
    def from_dict(cls, obj: dict) -> DeviceModel:
        """Create an instance of DeviceModel from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return DeviceModel.parse_obj(obj)

        _obj = DeviceModel.parse_obj(
            {"name": obj.get("name"), "protocols": obj.get("protocols")}
        )
        return _obj