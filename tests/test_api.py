from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient

from src.database import get_db
from src.main import app
from src.models import Resource


def make_mock_db(resources=None):
    mock_db = MagicMock()
    mock_db.query.return_value.all.return_value = resources or []
    return mock_db


@pytest.fixture
def sample_resources():
    r1 = MagicMock(spec=Resource)
    r1.id = 1
    r1.jurisdiction = "Federal"
    r1.program_name = "SNAP"
    r1.beneficiary = "Low-income individuals"
    r1.phone = "1-800-221-5689"
    r1.link = "https://www.fns.usda.gov/snap"
    r1.eligibility_requirements = "Income below 130% FPL"
    r1.minimum_age = "0"
    r1.disability = "Not required"
    r1.insurance = "Not required"
    r1.caregiver_requirement = "None"
    r1.income_amount = "$2,313/month"
    r1.income_sources = "Earned and unearned"
    r1.residency = "US resident"
    r1.medical_status = "Not required"
    r1.program_enrollment_dependencies = "None"
    r1.citizenship = "US Citizen"
    r1.criminal_records = "No restrictions"

    r2 = MagicMock(spec=Resource)
    r2.id = 2
    r2.jurisdiction = "State - California"
    r2.program_name = "CalWORKs"
    r2.beneficiary = "Families with children"
    r2.phone = "1-877-847-3663"
    r2.link = "https://www.cdss.ca.gov/calworks"
    r2.eligibility_requirements = "Income and asset limits"
    r2.minimum_age = "0"
    r2.disability = "Accommodations available"
    r2.insurance = "Not required"
    r2.caregiver_requirement = "None"
    r2.income_amount = "$1,130/month"
    r2.income_sources = "Earned and unearned"
    r2.residency = "California resident"
    r2.medical_status = "Not required"
    r2.program_enrollment_dependencies = "None"
    r2.citizenship = "US Citizen"
    r2.criminal_records = "No restrictions"

    return [r1, r2]


def test_health_check():
    client = TestClient(app)
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_login_returns_placeholder():
    client = TestClient(app)
    response = client.post(
        "/api/login",
        json={"username": "testuser", "password": "testpass"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "success" in data
    assert data["success"] is False


def test_login_missing_fields():
    client = TestClient(app)
    response = client.post("/api/login", json={"username": "testuser"})
    assert response.status_code == 422


def test_get_resources(sample_resources):
    mock_db = make_mock_db(sample_resources)
    app.dependency_overrides[get_db] = lambda: mock_db
    client = TestClient(app)

    response = client.get("/api/resources")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["jurisdiction"] == "Federal"
    assert data[0]["program_name"] == "SNAP"
    assert data[1]["jurisdiction"] == "State - California"
    assert data[1]["program_name"] == "CalWORKs"

    app.dependency_overrides.clear()


def test_get_resources_empty():
    mock_db = make_mock_db([])
    app.dependency_overrides[get_db] = lambda: mock_db
    client = TestClient(app)

    response = client.get("/api/resources")
    assert response.status_code == 200
    assert response.json() == []

    app.dependency_overrides.clear()


def test_resource_schema_fields(sample_resources):
    mock_db = make_mock_db(sample_resources)
    app.dependency_overrides[get_db] = lambda: mock_db
    client = TestClient(app)

    response = client.get("/api/resources")
    data = response.json()
    expected_fields = [
        "id", "jurisdiction", "program_name", "beneficiary", "phone",
        "link", "eligibility_requirements", "minimum_age", "disability",
        "insurance", "caregiver_requirement", "income_amount",
        "income_sources", "residency", "medical_status",
        "program_enrollment_dependencies", "citizenship", "criminal_records",
    ]
    for field in expected_fields:
        assert field in data[0], f"Missing field: {field}"

    app.dependency_overrides.clear()
