from pydantic import BaseModel, Field
from sqlmodel import SQLModel, Field
from typing import Optional


class Student(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    index_number: str = Field(max_length=12)
    email: str
