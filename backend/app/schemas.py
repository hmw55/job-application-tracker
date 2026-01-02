from pydantic import BaseModel
from typing import Optional

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