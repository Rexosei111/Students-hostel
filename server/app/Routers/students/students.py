from fastapi import APIRouter
from ...database import create_session

student_router = APIRouter(tags=["Students"], prefix="/students")


@student_router.get("/")
async def get_students():
    return {"students": ["list of students"]}
