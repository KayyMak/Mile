# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Mile is a FastAPI backend for tracking mileage/trips. Users register, log in via JWT, and record trips (start/end odometer readings + purpose) tied to their account.

## Environment setup

- Python virtualenv lives in `.venv/` (Windows). Activate with `.venv\Scripts\activate` (PowerShell) or `.venv/Scripts/activate` (Git Bash).
- Dependencies: `pip install -r requirements.txt`
- Requires a `.env` file (gitignored) with: `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `SECRET_KEY`. Database is PostgreSQL (`postgresql+psycopg2` driver via SQLAlchemy).

## Common commands

- Run the API locally: `uvicorn app.main:app --reload`
- Create a new migration after changing `app/db_models.py`: `alembic revision --autogenerate -m "message"`
- Apply migrations: `alembic upgrade head`
- Roll back one migration: `alembic downgrade -1`

There is no test suite, linter, or build step configured in this repo yet.

## Architecture

Everything currently lives in `app/main.py` — routes, JWT auth logic, and business logic are not split out despite `app/routers/` existing (`trips.py` and `users.py` in that directory are empty stub files, unused).

- `app/main.py` — FastAPI app instance and all route handlers (`/api/register`, `/api/login`, `/api/trips` CRUD). Also defines `create_access_token` and the `get_current_user` auth dependency (JWT bearer token, decoded with `PyJWT`, `HS256`).
- `app/config.py` — loads settings from `.env` via `python-dotenv`, exposes them as module-level variables (`db_user`, `db_password`, `secret_key`, etc.). Other modules import these directly rather than using a settings object.
- `app/database.py` — SQLAlchemy `engine`/`sessionLocal` setup and the `get_db` dependency (yields a session per-request, closes in `finally`).
- `app/db_models.py` — SQLAlchemy ORM models (`Users`, `Trips`). `Trips.user_id` is a foreign key to `Users.id` with `ondelete="CASCADE"`.
- `app/schemas.py` — Pydantic request/response models (`UserCreate`, `UserLogin`, `UserResponse`, `TripCreate`, `TripUpdate`). `UserResponse` uses `from_attributes = True` to serialize from ORM objects.
- `alembic/` — migrations. `alembic/env.py` builds the DB URL from `app/config.py` values (not from `alembic.ini`) and targets `app.db_models.Base.metadata` for autogenerate.

### Auth flow

1. `/api/register` hashes the password with `passlib.hash.bcrypt` and stores the user.
2. `/api/login` accepts `OAuth2PasswordRequestForm` (username field holds the email), verifies the bcrypt hash, and returns a JWT (45-minute expiry) encoding `user_id`.
3. Protected routes depend on `get_current_user`, which decodes the bearer token and loads the `Users` row; invalid tokens raise 403, missing/unknown users raise 401.
4. All trip routes scope queries by `db_trips.user_id == user.id` so users can only see/edit/delete their own trips.

### Known inconsistencies to be aware of

- `app/routers/users.py` and `app/routers/trips.py` are empty; don't assume route logic lives there.
