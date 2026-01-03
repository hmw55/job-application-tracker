from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime
from .database import get_db

# --- Companies CRUD ---
def get_companies(db:Session):
    return db.query(models.Company).all()

def get_company(db: Session, company_id: int):
    return db.query(models.Company).filter(models.Company.id == company_id).first()

def create_company(db: Session, company: schemas.CompanyCreate):
    db_company = models.Company(
        name=company.name,
        location=company.location,
        industry=company.industry
    )
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

def update_company(db: Session, company_id: int, company: schemas.CompanyCreate):
    db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if db_company:
        db_company.name = company.name
        db_company.location = company.location
        db_company.industry = company.industry
        db.commit()
        db.refresh(db_company)
    return db_company

def delete_company(db: Session, company_id: int):
    db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if db_company:
        db.delete(db_company)
        db.commit()
    return db_company

# --- Jobs CRUD ---
def get_jobs(db: Session):
    # Get all jobs
    return db.query(models.Job).join(models.Company).all()

def get_job(db: Session, job_id: int):
    # Get a single job by ID
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job: 
        raise HTTPException(status_code=404, detail="Job not found")
    return job

def create_job(db: Session, job: schemas.JobCreate):
    # Create a job entry
    # Make sure company exists
    db_company = db.query(models.Company).filter(models.Company.id == job.company_id).first()
    if not db_company:
        raise HTTPException(status_code=400, detail="Company not found")

    db_job = models.Job(
        company_id=job.company_id,
        title=job.title,
        status=job.status,
        job_type=job.job_type,
        compensation_type=job.compensation_type,
        compensation_amount=job.compensation_amount,
        applied_date=job.applied_date,
        last_updated=job.last_updated,
        notes=job.notes
    )

    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def update_job(db: Session, job_id: int, job: schemas.JobCreate):
    # Update and existing job
    db_job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")

    for field, value in job.dict(exclude_unset=True).items():
        setattr(db_job, field, value)

    db.commit()
    db.refresh(db_job)
    return db_job

def delete_job(db: Session, job_id: int):
    # Delete a job by ID
    db_job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(db_job)
    db.commit()
    return db_job