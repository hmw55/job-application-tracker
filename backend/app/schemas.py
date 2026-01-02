from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

# --- Companies schemas ---
class CompanyBase(BaseModel):
    name: str
    location: Optional[str] = None
    industry: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: int

    class Config:
        orm_mode = True

# --- Jobs schemas ---
class JobBase(BaseModel):
    company_id: int
    title: str
    status: Optional[str] = None
    applied_date: Optional[date] = None
    last_updated: Optional[date] = None
    notes: Optional[str] = None

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int

    class Config:
        orm_mode = True