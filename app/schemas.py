from pydantic import BaseModel, EmailStr
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
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str

    class Config:
        from_attributes = True
