import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from app import models

# Use a fresh test database in memory
SQLALCHEMY_DATABASE_URL = "sqlite://:memory:"

# Override database for testing
@pytest.fixture(scope="module")
def test_client():
    # Create tables
    Base.metadata.create_all(bind=engine)
    client = TestClient(app)
    yield client
    # Drop tables after tests
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def db_session():
    db: Session = SessionLocal()
    yield db
    db.close()

# --- Company Tests ---
def test_create_company(test_client):
    data = {"name": "TestCo", "location": "City", "industry": "Tech"}
    response = test_client.post("/api/companies", json=data)
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["name"] == "TestCo"
    assert "id" in json_data

def test_get_companies(test_client):
    response = test_client.get("/api/companies")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_company_not_found(test_client):
    response = test_client.get("/api/companies/999")
    assert response.status_code == 404

def test_delete_company(test_client):
    # Create first
    data = {"name": "DeleteCo", "location": "City", "industry": "Tech"}
    create_resp = test_client.post("/api/companies", json=data)
    company_id = create_resp.json()["id"]

    # Delete
    response = test_client.delete(f"/api/companies/{company_id}")
    assert response.status_code == 200

    # Confirm deleted
    get_resp = test_client.get(f"/api/companies/{company_id}")
    assert get_resp.status_code == 404

# --- Job Tests ---
def test_create_job(test_client):
    # First, create a company for FK
    company_data = {"name": "JobCo", "location": "City", "industry": "Tech"}
    company_resp = test_client.post("/api/companies", json=company_data)
    company_id = company_resp.json()["id"]

    job_data = {
        "company_id": company_id,
        "title": "Engineer",
        "status": "Applied",
        "applied_date": "2026-01-01",
        "last_updated": "2026-01-01",
        "notes": "Test notes"
    }
    response = test_client.post("/api/jobs", json=job_data)
    assert response.status_code == 200
    assert response.json()["title"] == "Engineer"

def test_get_jobs(test_client):
    response = test_client.get("/api/jobs")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_job_not_found(test_client):
    response = test_client.get("/api/jobs/999")
    assert response.status_code == 404

def test_update_job(test_client):
    # Create a company
    company_data = {"name": "JobUpdateCo", "location": "City", "industry": "Tech"}
    company_resp = test_client.post("/api/companies", json=company_data)
    company_id = company_resp.json()["id"]

    # Create a job
    job_data = {
        "company_id": company_id,
        "title": "OldTitle",
        "status": "Applied",
        "applied_date": "2026-01-01",
        "last_updated": "2026-01-01",
        "notes": "Old notes"
    }
    job_resp = test_client.post("/api/jobs", json=job_data)
    job_id = job_resp.json()["id"]

    # Update
    update_data = {
        "company_id": company_id,
        "title": "NewTitle",
        "status": "interview",
        "applied_date": "2026-01-02",
        "last_updated": "2026-01-03",
        "notes": "Updated notes"
    }
    response = test_client.put(f"/api/jobs/{job_id}", json=update_data)
    assert response.status_code == 200
    assert response.json()["title"] == "NewTitle"

def test_delete_job(test_client):
    # Create a company
    company_data = {"name": "JobDeleteCo", "location": "City", "industry": "Tech"}
    company_resp = test_client.post("/api/companies", json=company_data)
    company_id = company_resp.json()["id"]

    # Create a job
    job_data = {
        "company_id": company_id,
        "title": "DeleteMe",
        "status": "Applied",
        "applied_date": "2026-01-01",
        "last_updated": "2026-01-01",
        "notes": "Delete notes"
    }
    job_resp = test_client.post("/api/jobs", json=job_data)
    job_id = job_resp.json()["id"]

    # Delete job
    response = test_client.delete(f"/api/jobs/{job_id}")
    assert response.status_code == 200

    # Confirm deletion
    get_resp = test_client.get(f"/api/jobs/{job_id}")
    assert get_resp.status_code == 404