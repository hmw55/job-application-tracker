from sqlalchemy import Column, Integer, String, ForeignKey, Date, Text
from sqlalchemy.orm import relationship
from .database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=True)
    industry = Column(String, nullable=True)

    jobs = relationship("Job", back_populates="company", cascade="all, delete")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    title = Column(String, nullable=False)
    status = Column(String, default="applied")
    applied_date = Column(Date, nullable=True)
    last_updated = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)

    company = relationship("Company", back_populates="jobs")