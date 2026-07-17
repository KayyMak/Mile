from fastapi import FastAPI, status, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
import jwt
from .schemas import UserTrip, UserCreate, UserLogin, UserResponse, UpdateTrip
from .db_models import Trips as db_trips, Users as db_users
from .database import get_db
from .config import secret_key

security = HTTPBearer()

app = FastAPI()

# Defining the domains that can access this API
origins = ['http://localhost:3000']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# jwt token for authentication
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(payload=to_encode, key=secret_key, algorithm="HS256")
    return encoded_jwt

# authenticate current user
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        decoded_jwt = jwt.decode(token, secret_key, algorithms=['HS256'])
        user = db.query(db_users).filter(db_users.id == decoded_jwt.get('user_id')).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not authorized")
        return user
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Authentication Token")

    
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

# login
@app.post("/api/login")
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(db_users).filter(db_users.email == credentials.email).first()
    if not user or not bcrypt.verify(credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(data={"user_id": user.id}, expires_delta=timedelta(minutes=45))
    return {'access_token': access_token, 'token_type': 'bearer'}


# Create a trip
@app.post("/api/trips")
async def create_UserTrip(trips_request: UserTrip, db: Session = Depends(get_db), user: db_users = Depends(get_current_user)):
    # Creates a UserTrip model object and then adds to the database
    new_trip = db_trips(
        user_id=user.id,
        start_odometer=trips_request.start_odometer, 
        end_odometer=trips_request.end_odometer, 
        purpose=trips_request.purpose
        )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    return new_trip

# todo -- get all trips
@app.get("/api/trips")
async def get_all_UserTrip(db: Session = Depends(get_db), user = Depends(get_current_user)):
    trip_obj = db.query(db_trips).filter(db_trips.user_id == user.id).all()
    return trip_obj

# delete a trip
@app.delete("/api/trips/{id}")
async def delete_UserTrip(id: int, db: Session = Depends(get_db), user = Depends(get_current_user)):
    del_trip = db.query(db_trips).filter(db_trips.id == id, db_trips.user_id == user.id).delete()
    if not del_trip:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    db.commit()

# edit a trip
@app.patch("/api/trips/{id}")
async def edit_UserTrip(id: int, trip_sent: UpdateTrip, db: Session = Depends(get_db), user = Depends(get_current_user)):
    edit_trip = trip_sent.model_dump(exclude_unset=True)
    # check if request body is empty
    if not edit_trip:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty request body")

    trip_obj = db.query(db_trips).filter(db_trips.user_id == user.id, db_trips.id == id).first()
    # check if trip exists
    if not trip_obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
    
    for category in edit_trip:
        setattr(trip_obj, category, edit_trip[category])
    db.commit()
    db.refresh(trip_obj)
    return trip_obj