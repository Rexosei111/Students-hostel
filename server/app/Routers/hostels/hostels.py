from fastapi import APIRouter


hostel_router = APIRouter(tags=["Hostels"], prefix="/hostels")


@hostel_router.get("/")
async def get_hostels():
    return {"hostels": ["list of hostels"]}
