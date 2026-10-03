# Mile

A mileage tracker for recording trips with start and end odometer readings and a purpose. Users can register, sign in, and manage their own trips.

Built with Next.js and React on the frontend, and FastAPI, SQLAlchemy, and PostgreSQL on the backend.

## Run locally

You’ll need Python, Node.js with npm, and a running PostgreSQL database.

### Backend

From the project root:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the project root with your database credentials and a secret key:

```dotenv
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mile
SECRET_KEY=replace_with_a_random_secret
```

Create the database named in `DB_NAME`, then apply migrations and start the API:

```sh
alembic upgrade head
uvicorn app.main:app --reload
```

The API runs at http://localhost:8000. Interactive API documentation is available at http://localhost:8000/docs.

### Frontend

In a separate terminal:

```sh
cd mile-frontend
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The example environment file points the frontend at the local API.
