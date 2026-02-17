# AI-Decava

A three-tier web application for managing and querying government assistance program resources. Built with React, FastAPI, and PostgreSQL.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (Tier 1)                          │
│                     React + TypeScript (:3000)                      │
│                                                                     │
│  ┌─────────────┐   ┌──────────────────┐   ┌─────────────────────┐  │
│  │  Home Page   │   │ Resources Table  │   │    Login Page       │  │
│  │     /        │   │  /sample-table   │   │     /login          │  │
│  └─────────────┘   └──────────────────┘   └─────────────────────┘  │
│                              │                        │             │
│                     ┌────────┴────────────────────────┘             │
│                     │  API Client (src/api/client.ts)               │
│                     │  Base URL: http://localhost:8000               │
└─────────────────────┼───────────────────────────────────────────────┘
                      │  HTTP (JSON)
                      │  CORS: localhost:3000
                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          BACKEND (Tier 2)                           │
│                    Python + FastAPI (:8000)                          │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                     main.py (FastAPI App)                     │   │
│  │                                                               │   │
│  │   GET  /api/health      → Health check                       │   │
│  │   GET  /api/resources   → List all resources                 │   │
│  │   POST /api/login       → Login (placeholder)                │   │
│  └──────────────┬───────────────────────────────────────────────┘   │
│                 │                                                    │
│  ┌──────────────┴──────────┐   ┌────────────────────────────────┐  │
│  │  models.py              │   │  schemas.py                    │  │
│  │  SQLAlchemy ORM Models  │   │  Pydantic Validation Schemas   │  │
│  │  - Resource             │   │  - ResourceSchema              │  │
│  └──────────────┬──────────┘   │  - LoginRequest/Response       │  │
│                 │              └────────────────────────────────┘   │
│  ┌──────────────┴──────────┐                                       │
│  │  database.py            │                                       │
│  │  SQLAlchemy Engine      │                                       │
│  │  Session Management     │                                       │
│  └──────────────┬──────────┘                                       │
└─────────────────┼───────────────────────────────────────────────────┘
                  │  SQLAlchemy / psycopg2
                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DATABASE (Tier 3)                           │
│                     PostgreSQL (:5432)                               │
│                     Database: decava                                 │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Table: resources                                             │   │
│  │                                                               │   │
│  │  id (PK)  │ jurisdiction │ program_name │ beneficiary │ ...  │   │
│  │  phone    │ link (URL)   │ eligibility  │ min_age     │ ...  │   │
│  │  disability │ insurance  │ caregiver    │ income      │ ...  │   │
│  │  residency  │ medical    │ enrollment   │ citizenship │ ...  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Seed data: SNAP, Medicaid, CalWORKs, SSDI, SSI                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
ai-decava/
├── frontend/               # Tier 1 — React TypeScript SPA
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts       # API client (fetchResources, login)
│   │   ├── pages/
│   │   │   ├── SampleTable.tsx  # Resources table with clickable links
│   │   │   └── Login.tsx        # Login form
│   │   ├── App.tsx              # Router & navigation
│   │   └── App.css              # Global styles
│   ├── package.json
│   └── tsconfig.json
│
├── src/                    # Tier 2 — Python FastAPI backend
│   ├── main.py                 # App entry point, routes, CORS
│   ├── database.py             # SQLAlchemy engine & session
│   ├── models.py               # ORM model (Resource)
│   └── schemas.py              # Pydantic schemas
│
├── tests/                  # Backend test suite
│   └── test_api.py             # pytest + FastAPI TestClient
│
├── init_db.sql             # Tier 3 — PostgreSQL schema + seed data
├── requirements.txt        # Python dependencies
├── claude.md               # Project context for AI tooling
└── README.md
```

---

## Data Flow

```
 User Browser                   FastAPI Server                  PostgreSQL
 ───────────                    ──────────────                  ──────────
      │                              │                              │
      │  GET /api/resources          │                              │
      │─────────────────────────────►│                              │
      │                              │  SELECT * FROM resources     │
      │                              │─────────────────────────────►│
      │                              │                              │
      │                              │◄─────────────────────────────│
      │                              │       [rows]                 │
      │◄─────────────────────────────│                              │
      │       [JSON array]           │                              │
      │                              │                              │
      │  POST /api/login             │                              │
      │─────────────────────────────►│                              │
      │◄─────────────────────────────│                              │
      │  {success: false}            │                              │
```

---

## Technology Stack

| Layer      | Technology              | Purpose                          |
|------------|-------------------------|----------------------------------|
| Frontend   | React 19 + TypeScript   | Single-page application          |
| Routing    | React Router DOM 6      | Client-side page navigation      |
| Build Tool | Create React App        | Dev server, bundling, testing    |
| Backend    | FastAPI                 | REST API framework               |
| ORM        | SQLAlchemy 2.0          | Database object mapping          |
| Validation | Pydantic 2.0            | Request/response schema          |
| Database   | PostgreSQL              | Relational data storage          |
| DB Driver  | psycopg2                | Python-PostgreSQL adapter        |
| Testing    | pytest / React Testing Library | Backend + frontend tests  |

---

## API Endpoints

| Method | Endpoint          | Description                  | Response              |
|--------|-------------------|------------------------------|-----------------------|
| GET    | `/api/health`     | Health check                 | `{"status": "healthy"}` |
| GET    | `/api/resources`  | List all resources           | `ResourceSchema[]`    |
| POST   | `/api/login`      | Login (placeholder)          | `LoginResponse`       |

---

## Database Schema: `resources`

| Column                         | Type         | Description                                |
|--------------------------------|--------------|--------------------------------------------|
| `id`                           | SERIAL (PK)  | Auto-incrementing primary key              |
| `jurisdiction`                 | VARCHAR(255)  | Federal / State level                      |
| `program_name`                 | VARCHAR(255)  | Name of the assistance program             |
| `beneficiary`                  | VARCHAR(255)  | Target population                          |
| `phone`                        | VARCHAR(50)   | Contact phone number                       |
| `link`                         | TEXT          | URL to official program website            |
| `eligibility_requirements`     | TEXT          | Eligibility criteria description           |
| `minimum_age`                  | VARCHAR(50)   | Minimum age requirement                    |
| `disability`                   | VARCHAR(255)  | Disability requirements                    |
| `insurance`                    | VARCHAR(255)  | Insurance requirements                     |
| `caregiver_requirement`        | TEXT          | Caregiver-related requirements             |
| `income_amount`                | VARCHAR(255)  | Income threshold                           |
| `income_sources`               | VARCHAR(255)  | Types of income considered                 |
| `residency`                    | VARCHAR(255)  | Residency requirements                     |
| `medical_status`               | TEXT          | Medical status requirements                |
| `program_enrollment_dependencies` | TEXT       | Prerequisite program enrollments           |
| `citizenship`                  | VARCHAR(255)  | Citizenship requirements                   |
| `criminal_records`             | VARCHAR(255)  | Criminal record restrictions               |

---

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### 1. Database Setup
```bash
psql -U postgres -c "CREATE DATABASE decava;"
psql -U postgres -d decava -f init_db.sql
```

### 2. Backend
```bash
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8000
```

### 3. Frontend
```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000` with the API at `http://localhost:8000`.

### 4. Run Tests
```bash
# Backend
pytest tests/ -v

# Frontend
cd frontend && npm test
```

---

## Environment Variables

| Variable        | Default                                              | Description           |
|-----------------|------------------------------------------------------|-----------------------|
| `DATABASE_URL`  | `postgresql://postgres:postgres@localhost:5432/decava`| PostgreSQL connection |
| `REACT_APP_API_URL` | `http://localhost:8000`                          | Backend API base URL  |
