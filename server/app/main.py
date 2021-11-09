from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi.responses import JSONResponse
from .Routers.hostels.hostels import hostel_router
from .Routers.students.students import student_router
from .database import create_db_and_tables, create_session
from sqlmodel import Session


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(hostel_router)
app.include_router(student_router)


@app.on_event("startup")
async def start():
    create_db_and_tables()


@app.get("/")
async def homepage(session: Session = Depends(create_session)):
    return "homepage"


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload="true")
