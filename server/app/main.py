from fastapi import FastAPI
import uvicorn
from fastapi.responses import JSONResponse
from .Routers.hostels.hostels import hostel_router
from .Routers.students.students import student_router


app = FastAPI()

app.include_router(hostel_router)
app.include_router(student_router)


@app.get("/")
async def homepage():
    return "homepage"


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload="true")
