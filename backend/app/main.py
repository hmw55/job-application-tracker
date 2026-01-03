from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import SessionLocal, engine, get_db
from . import models, crud, schemas

from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Job Tracker API is running"}

@app.get("/api/companies", response_model=list[schemas.Company])
def read_companies(db: Session = Depends(get_db)):
    return crud.get_companies(db)

@app.get("/api/companies/{company_id}", response_model=schemas.Company)
def read_company(company_id: int, db: Session = Depends(get_db)):
    company = crud.get_company(db, company_id)
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@app.post("/api/companies", response_model=schemas.Company)
def create_company(company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    return crud.create_company(db, company)

@app.put("/api/companies/{company_id}", response_model=schemas.Company)
def update_company(company_id: int, company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    updated = crud.update_company(db, company_id, company)
    if updated is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return updated

@app.delete("/api/companies/{company_id}", response_model=schemas.Company)
def delete_company(company_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_company(db, company_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return deleted


# --- Jobs CRUD ---
@app.get("/api/jobs", response_model=list[schemas.Job])
def read_jobs(db: Session = Depends(get_db)):
    return crud.get_jobs(db)

@app.get("/api/jobs/{job_id}", response_model=schemas.Job)
def read_job(job_id: int, db: Session = Depends(get_db)):
    job = crud.get_job(db, job_id)
    return job

@app.post("/api/jobs", response_model=schemas.Job)
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    return crud.create_job(db, job)

@app.put("/api/jobs/{job_id}", response_model=schemas.Job)
def update_job(job_id: int, job: schemas.JobCreate, db: Session = Depends(get_db)):
    return crud.update_job(db, job_id, job)

@app.delete("/api/jobs/{job_id}", response_model=schemas.Job)
def delete_job(job_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_job(db, job_id)
    if deleted is None:
        raise HTTPException(status_code=404, details="Job not found")
    return deleted