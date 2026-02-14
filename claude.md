# AI-Decava

## Project Overview
A 3-tier monorepo web application with a React/TypeScript frontend, Python/FastAPI backend, and PostgreSQL database.

## Architecture
- **Frontend**: React with TypeScript, located in `frontend/src/`
- **Backend**: Python with FastAPI, located in `src/`
- **Database**: PostgreSQL, database name `decava`

## Project Structure
```
ai-decava/
├── claude.md
├── frontend/           # React TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── src/                # Python FastAPI backend
│   ├── __init__.py
│   ├── main.py         # FastAPI app entry point
│   ├── database.py     # DB connection and session management
│   ├── models.py       # SQLAlchemy ORM models
│   └── schemas.py      # Pydantic schemas
├── tests/              # Backend tests
│   └── test_api.py
├── requirements.txt    # Python dependencies
├── init_db.sql         # Database initialization script
└── README.md
```

## Database
- **Name**: decava
- **Table**: resources
  - Columns: jurisdiction, program_name, beneficiary, phone, link, eligibility_requirements, minimum_age, disability, insurance, caregiver_requirement, income_amount, income_sources, residency, medical_status, program_enrollment_dependencies, citizenship, criminal_records

## Running the Application

### Backend
```bash
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Database Setup
```bash
psql -U postgres -f init_db.sql
```

## API Endpoints
- `GET /api/resources` - Fetch all resources
- `POST /api/login` - Login endpoint (placeholder)
- `GET /api/health` - Health check

## Testing

### Backend tests
```bash
pytest tests/ -v
```

### Frontend tests
```bash
cd frontend
npm test
```
