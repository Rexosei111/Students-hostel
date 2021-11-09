from fastapi import APIRouter, Depends, HTTPException, Query
from ...database import create_session
from sqlmodel import Session, select


from .models import (
    Owner,
    Hostel,
    Room,
    HostelCreate,
    HostelRead,
    RoomRead,
    OwnerRead,
    HostelReadWithRooms,
    RoomReadWithHostel,
    RoomCreate,
    OwnerCreate,
    RoomCreateWithHostelId,
)
from typing import List, Optional

hostel_router = APIRouter(tags=["Hostels"], prefix="/hostels")


async def common_dependencies(
    session: Session = Depends(create_session),
):
    return {"session": session}


@hostel_router.get("/rooms")
async def get_rooms(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    occupied: Optional[bool] = Query(None),
    common: dict = Depends(common_dependencies),
):

    session = common["session"]
    if occupied == None:
        statement = select(Room).offset(offset).limit(limit)
    else:
        statement = (
            select(Room).where(Room.occupied == occupied).offset(offset).limit(limit)
        )

    rooms = session.exec(statement).all()
    if not rooms:
        raise HTTPException(200, detail="No Rooms in the system")
    return rooms


@hostel_router.get("/summary")
async def get_summary(common: dict = Depends(common_dependencies)):
    session = common["session"]
    hostels = session.exec(select(Hostel)).all()
    rooms = session.exec(select(Room)).all()
    avg_price: float = 0
    Tt_avaialable_rooms: int = 0
    if rooms:
        total_price: float = sum([room.price for room in rooms])
        avg_price: float = total_price / len(rooms)
        Tt_avaialable_rooms: int = len(
            [room for room in rooms if room.occupied == False]
        )
    return {
        "number_of_hostels": len(hostels),
        "number_of_rooms": len(rooms),
        "available_rooms": Tt_avaialable_rooms,
        "average_price": float(f"{avg_price:.2f}"),
    }


@hostel_router.post("/", response_model=HostelReadWithRooms)
async def add_hostel(hostel: HostelCreate, common: dict = Depends(common_dependencies)):
    session = common["session"]
    if hasattr(hostel, "owner"):
        owner = hostel.owner
        print(owner)
        delattr(hostel, "owner")

    if hasattr(hostel, "rooms"):
        rooms = hostel.rooms
        print(rooms)
        delattr(hostel, "rooms")
    print(hostel)
    db_hostel: Hostel = Hostel.from_orm(hostel)
    if owner:
        db_hostel.owner = Owner.from_orm(owner)
    if rooms:
        for room in rooms:
            db_hostel.rooms.append(Room.from_orm(room))
    session.add(db_hostel)
    session.commit()
    session.refresh(db_hostel)
    return db_hostel


@hostel_router.get("/owners/{id}", response_model=OwnerRead)
async def get_owner(id: int, common: dict = Depends(common_dependencies)):
    session = common["session"]
    owner = session.get(Owner, id)
    if not owner:
        raise HTTPException(status_code=404, detail="owner not found")
    return owner


@hostel_router.post(
    "/owners", response_model=OwnerRead, response_model_exclude_none=True
)
async def add_owner(owner: OwnerCreate, common: dict = Depends(common_dependencies)):
    session = common["session"]
    if owner.email:
        owner_with_email = session.exec(
            select(Owner).where(Owner.email == owner.email)
        ).first()

    if owner_with_email:
        raise HTTPException(400, detail="Owner with this email already exist")
    new_owner = Owner.from_orm(owner)
    session.add(new_owner)
    try:
        session.commit()
    except Exception:
        raise HTTPException(500, detail="Something wrong occured")
    session.refresh(new_owner)
    return new_owner


@hostel_router.get("/", response_model=List[HostelRead])
async def get_hostels(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    common: dict = Depends(common_dependencies),
):
    session = common["session"]
    statement = select(Hostel).offset(offset).limit(limit)
    hostels = session.exec(statement).all()
    if not hostels:
        raise HTTPException(200, detail="No Hostels in the system")
    return hostels


@hostel_router.get("/{id}", response_model=HostelReadWithRooms)
async def get_hostel(
    id: int,
    common: dict = Depends(common_dependencies),
):
    session = common["session"]
    hostel = session.get(Hostel, id)
    if hostel:
        return hostel
    raise HTTPException(404, detail="Hostel Not found")


@hostel_router.post("/rooms", response_model=RoomRead)
async def add_room(
    room: RoomCreateWithHostelId, common: dict = Depends(common_dependencies)
):
    session = common["session"]
    new_room: Room = Room.from_orm(room)
    session.add(new_room)
    session.commit()
    session.refresh(new_room)
    return new_room


# @hostel_router.get(
#     "/{hostel_name}/rooms",
#     response_model=List[RoomRead],
# )
# async def get_hostel_rooms(
#     hostel_name: str,
#     common: dict = Depends(common_dependencies),
#     limit: Optional[int] = 10,
#     offset: Optional[int] = 0,
# ):
#     session = common["session"]


# @hostel_router.post("/{hostel_name}/rooms", response_model=RoomCreate)
# async def add_hostel_room(
#     hostel_name: str, common: dict = Depends(common_dependencies)
# ):
#     pass


# @hostel_router.put("/{hostel_name}/rooms/{number}", response_model=RoomCreate)
# async def update_hostel_room(
#     hostel_name: str, number: str, common: dict = Depends(common_dependencies)
# ):
#     pass
