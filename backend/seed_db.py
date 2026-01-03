from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models
from datetime import date

db: Session = SessionLocal()

# Example companies
companies = [
    models.Company(name="JobUpdateCO", location="City", industry="Tech"),
]

# Add Companies
for company in companies:
    db.add(company)
db.commit()

# Example jobs
jobs = [
    # Internship
    models.Job(
        company_id=1,
        title="Engineer Intern",
        status="applied",
        job_type="internship",
        compensation_type="hourly",
        compensation_amount=20,
        applied_date=date(2025,12,31),
        last_updated=date(2025,12,31),
        notes="First test note"
    ),
    # Part Time
    models.Job(
        company_id=1,
        title="Engineer Part Time",
        status="applied",
        job_type="part_time",
        compensation_type="salary",
        compensation_amount=50000,
        applied_date=date(2025,12,31),
        last_updated=date(2026,1,1),
        notes="Testing salary only"
    ),
    # Full Time
    models.Job(
        company_id=1,
        title="Engineer Full Time",
        status="applied",
        job_type="full_time",
        compensation_type="salary",
        compensation_amount=120000,
        applied_date=date(2025,12,31),
        last_updated=date(2026,1,2),
        notes="Full time with salary"
    ),
    # Remote
    models.Job(
        company_id=1,
        title="Engineer Remote",
        status="applied",
        job_type="remote",
        compensation_type="hourly",
        compensation_amount=40,
        applied_date=date(2025,12,31),
        last_updated=date(2026,1,2),
        notes="Remote Hourly"
    ),
]

for job in jobs:
    db.add(job)
db.commit()

print("Database seeded with example data!")
db.close()