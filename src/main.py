from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from src.database import get_db
from src.models import Resource
from src.schemas import LoginRequest, LoginResponse, ResourceSchema

app = FastAPI(title="Decava API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


@app.get("/api/resources", response_model=list[ResourceSchema])
def get_resources(db: Session = Depends(get_db)):
    resources = db.query(Resource).all()
    return resources


@app.post("/api/login", response_model=LoginResponse)
def login(request: LoginRequest):
    return LoginResponse(message="Login endpoint placeholder", success=False)
