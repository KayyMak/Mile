from pydantic import BaseModel
from typing import Optional, List

# Pydantic Model
class TripCreate(BaseModel):
    start_odometer: int
    end_odometer: int
    purpose: str

class TripUpdate(BaseModel):
    start_odometer: Optional[int] = None
    end_odometer: Optional[int] = None
    purpose: Optional[str] = None
    
class UserCreate(BaseModel):
    email: str
    username: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str

    class Config:
        from_attributes = True
