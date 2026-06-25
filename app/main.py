from fastapi import FastAPI, status, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from datetime import datetime, timedelta, timezone
import jwt
from .schemas import UserTrip, UserCreate, UserLogin, UserResponse
from .db_models import Trips as db_trips, Users as db_users
from .database import get_db
from .config import secret_key


app = FastAPI()

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(payload=to_encode, key=secret_key, algorithm="HS256")
    return encoded_jwt


# Create an account
@app.post("/api/register", response_model=UserResponse)
async def register_account(account: UserCreate, db: Session = Depends(get_db)):
    # checking if the email sent already exists in the database
    existing_user = db.query(db_users).filter(db_users.email == account.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="This email is already being used.")
    hashed_password = bcrypt.hash(account.password)
    new_account = db_users(
        email=account.email,
        username=account.username,
        password=hashed_password
    )
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    return new_account

@app.post("/api/login")
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(db_users).filter(db_users.email == credentials.email).first()
    if not user or not bcrypt.verify(credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(data={"user_id": user.id}, expires_delta=timedelta(minutes=45))
    return {"access_token": access_token, "token_type": "bearer"}


# Create a trip
@app.post("/api/trips")
async def create_UserTrip(trips_request: UserTrip, db: Session = Depends(get_db)):
    # Creates a UserTrip model object and then adds to the database
    new_trip = db_trips(
        start_odometer=trips_request.start_odometer, 
        end_odometer=trips_request.end_odometer, 
        purpose=trips_request.trip_purpose
        )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    return new_trip

# todo -- get all trips
@app.get("/api/trips")
async def get_all_UserTrip(db: Session = Depends(get_db)):
    trip_obj = db.query(db_trips).filter(db_trips.user_id == user_id).all()
    return trip_obj

# get a specific trip
@app.get("/api/trips/{id}")
async def get_trip():
    pass