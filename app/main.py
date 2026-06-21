from fastapi import FastAPI, status, Depends
from .schemas import trips
from .db_models import Trips as db_trip
from .database import get_db
from sqlalchemy.orm import Session

app = FastAPI()

@app.post("/api/trips")
async def create_trips(trips_request: trips, db: Session = Depends(get_db)):
        # Creates a Trips model object and then adds to the database
    new_trip = db_trip(
        start_odometer=trips_request.start_odometer, 
        end_odometer=trips_request.end_odometer, 
        purpose=trips_request.trip_purpose
        )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    return new_trip
