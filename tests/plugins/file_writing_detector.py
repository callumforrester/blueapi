from typing import List

from ophyd import Component, Device, Signal

from blueapi.plugins.data_writing import DataCollectionProvider


class FakeFileWritingDetector(Device):
    image_count: Signal = Component(Signal, value=0, kind="hinted")
    collection_number: Signal = Component(Signal, value=0, kind="config")

    _provider: DataCollectionProvider

    def __init__(self, name: str, provider: DataCollectionProvider, **kwargs):
        super().__init__(name=name, **kwargs)
        self.stage_sigs[self.image_count] = 0
        self._provider = provider

    def trigger(self, *args, **kwargs):
        return self.image_count.set(self.image_count.get() + 1)

    def stage(self) -> List[object]:
        collection = self._provider.current_data_collection
        if collection is None:
            raise Exception("No active collection")
        self.stage_sigs[self.collection_number] = collection.collection_number
        return super().stage()
