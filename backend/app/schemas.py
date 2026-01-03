from pydantic import BaseModel, field_validator, ConfigDict
from typing import Optional
from datetime import date

# --- Companies schemas ---
class CompanyBase(BaseModel):
    name: str
    location: Optional[str] = None
    industry: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


VALID_STATUS = [
    "saved",
    "applied",
    "interview",
    "offer",
    "rejected",
    "withdrawn",
]

VALID_JOB_TYPES = [
    "full_time",
    "part_time",
    "internship",
    "contract",
    "temporary",
    "remote",
    "hybrid",
    "on_site",
]

VALID_COMP_TYPES = ["hourly", "salary"]

# --- Jobs schemas ---
class JobBase(BaseModel):
    company_id: int
    title: str
    status: Optional[str] = None
    job_type: Optional[str] = None
    compensation_type: Optional[str] = None
    compensation_amount: Optional[int] = None
    applied_date: Optional[date] = None
    last_updated: Optional[date] = None
    notes: Optional[str] = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: Optional[str]):
        if v is None:
            return v
        normalized = v.strip().lower()
        if normalized not in VALID_STATUS:
            raise ValueError(f"Invalid status: {v}")  
        return normalized

    @field_validator("job_type")
    @classmethod
    def valid_job_types(cls, v: Optional[str]):
        if v is None:
            return v
        normalized = v.strip().lower()
        if normalized not in VALID_JOB_TYPES:
            raise ValueError(f"Invalid job type: {v}")
        return normalized

    @field_validator("compensation_type")
    @classmethod
    def validate_comp_types(cls, v: Optional[str]):
        if v is None:
            return v
        normalized = v.strip().lower()
        if normalized not in VALID_COMP_TYPES:
            raise ValueError(f"Invalid compensation type: {v}")
        return normalized 

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int

    model_config = ConfigDict(from_attributes=True)