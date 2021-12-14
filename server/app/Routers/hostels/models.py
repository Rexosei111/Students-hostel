from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import UniqueConstraint, CheckConstraint
from typing import Optional, List

#### Owner Models
class BaseOwner(SQLModel):
    first_name: str = Field(max_length=15)
    last_name: Optional[str] = Field(default=None, max_length=15)
    phone_number: str = Field(max_length=13)
    age: Optional[int] = Field(default=None)
    gender: str = Field(max_length=1)
    email: Optional[str] = Field(default=None, max_length=50)


class Owner(BaseOwner, table=True):
    __table_args__ = (
        CheckConstraint("gender == 'M' or gender = 'F'"),
        UniqueConstraint("email"),
    )
    id: Optional[int] = Field(default=None, primary_key=True)
    hostels: List["Hostel"] = Relationship(back_populates="owner")


class OwnerCreate(BaseOwner):
    pass


class OwnerRead(BaseOwner):
    id: int
    gender: str
    email: Optional[str] = Field(default=None, max_length=50)


#####

#### Hostel Models


class BaseHostel(SQLModel):
    name: str = Field(max_length=20)
    location: str
    number_of_rooms: int = Field(default=None, nullable=True)


class Hostel(BaseHostel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    owner_id: Optional[int] = Field(default=None, foreign_key="owner.id")
    owner: Owner = Relationship(back_populates="hostels")
    rooms: List["Room"] = Relationship(back_populates="hostel")


class HostelRead(BaseHostel):
    id: int
    owner_id: int


#####

#### Room Models


class BaseRoom(SQLModel):
    room_number: int
    number_of_occupants: int
    price: float
    occupied: Optional[bool] = Field(default=False, nullable=False)


class Room(BaseRoom, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hostel_id: Optional[int] = Field(default=None, foreign_key="hostel.id")
    hostel: Optional["Hostel"] = Relationship(back_populates="rooms")


#####


class RoomCreateWithHostelId(BaseRoom):
    hostel_id: int


class RoomCreate(BaseRoom):
    pass


class RoomRead(BaseRoom):
    id: int


class RoomReadWithHostel(RoomRead):
    hostel_id: int


class RoomReadWithHostelName(RoomRead):
    hostel_id: int
    hostel: Optional[BaseHostel] = None


class HostelReadWithRooms(HostelRead):
    owner: Optional[OwnerRead] = None
    rooms: List[RoomRead] = []


class HostelCreate(SQLModel):
    name: str = Field(max_length=20)
    location: str
    number_of_rooms: int = Field(default=None, nullable=True)
    owner: Optional[OwnerCreate]
    rooms: Optional[List[RoomCreate]]
