from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, declarative_base

Base = declarative_base()


# Database models
class Users(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

class Trips(Base):
    __tablename__ = "Trips"
    user_id = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"))
    id = Column(Integer, primary_key=True, index=True)
    start_odometer = Column(Integer, nullable=False)
    end_odometer = Column(Integer, nullable=False)
    purpose = Column(String)