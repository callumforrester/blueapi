import contextlib
import logging


class StdLogger:
    """
    Context manager for redirect stdout to logger
    """

    def __init__(self, name: str = "root", level: str = "INFO"):
        self.logger = logging.getLogger(name)
        self.name = self.logger.name
        self.level = getattr(logging, level)
        self._redirector: contextlib.redirect_stdout = contextlib.redirect_stdout(self)

    def write(self, msg: str):
        if msg and not msg.isspace():
            self.logger.log(self.level, msg)

    def flush(self):
        pass

    def __enter__(self):
        self._redirector.__enter__()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self._redirector.__exit__(exc_type, exc_value, traceback)
