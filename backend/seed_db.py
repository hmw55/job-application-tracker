from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models

db: Session = SessionLocal()

# Example companies
companies = [
    models.Company(name="Acme Corp", location="New York", industry="Tech"),
    models.Company(name="Globex Inc", location="Los Angeles", industry="Finance"),
]

# Add Companies
for company in companies:
    db.add(company)
db.commit()

# Example jobs
jobs = [
    models.Job(company_id=1, title="Software Engineer", status="Applied"),
    models.Job(company_id=2, title="Financial Analyst", status="Applied"),
]

for job in jobs:
    db.add(job)
db.commit()

print("Database seeded with example data!")
db.close()