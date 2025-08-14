# Job Tracker Backend

FastAPI backend for the Job Tracker application.

## Setup

1. Install dependencies with uv:
```bash
uv sync
```

2. Activate virtual environment:
```bash
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Run the server:
```bash
python main.py
```

The API will be available at http://localhost:8000
API documentation at http://localhost:8000/docs

## API Endpoints

- GET `/api/jobs` - Get all jobs
- POST `/api/jobs` - Create new job
- GET `/api/jobs/{job_id}` - Get specific job
- PUT `/api/jobs/{job_id}` - Update job
- DELETE `/api/jobs/{job_id}` - Delete job
- GET `/api/contacts` - Get all contacts
- POST `/api/contacts` - Create new contact
- GET `/api/analytics` - Get analytics data

## TODO

- [ ] Add database connection (PostgreSQL)
- [ ] Implement authentication
- [ ] Add data validation
- [ ] Implement actual CRUD operations
- [ ] Add error handling
- [ ] Add logging
- [ ] Add tests