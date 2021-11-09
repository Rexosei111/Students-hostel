from sqlmodel import SQLModel, create_engine, Session
from .settings import settings
from functools import lru_cache
from .Routers.hostels import models
from .Routers.students import models


@lru_cache
def create_sql_engine(database_url: str = None, database_name: str = None):
    connect_args = {"check_same_thread": False}
    if all([database_url, database_name]):
        db = f"{database_url}{database_name}"
        return create_engine(db, echo=True, connect_args=connect_args)
    else:
        db = f"{settings.db_url}{settings.db_name}"
        print("creating new engine")
        return create_engine(db, echo=True, connect_args=connect_args)


def create_session():
    with Session(create_sql_engine()) as session:
        yield session


def create_db_and_tables():
    SQLModel.metadata.create_all(create_sql_engine())


def main():
    create_db_and_tables()


if __name__ == "__main__":
    main()
