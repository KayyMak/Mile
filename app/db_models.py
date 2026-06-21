from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, declarative_base

Base = declarative_base()


# Database models
class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)

class Trips(Base):
    __tablename__ = "Trips"
    id = Column(Integer, primary_key=True, index=True)
    start_odometer = Column(Integer, nullable=False)
    end_odometer = Column(Integer, nullable=False)
    purpose = Column(String)