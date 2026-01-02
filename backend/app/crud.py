from sqlalchemy.orm import Session
from . import models, schemas

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