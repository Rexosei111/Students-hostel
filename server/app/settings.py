from pydantic import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    secret_key: str = Field(...)

    class Config:
        env_file = ".env"


settings = Settings()
