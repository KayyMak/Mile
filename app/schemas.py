from pydantic import BaseModel
from typing import Optional, List

# Pydantic Model
class trips(BaseModel):
    start_odometer: int
    end_odometer: int
    trip_purpose: str

class users(BaseModel):
    email: str
    name: str
    password: str