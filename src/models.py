from sqlalchemy import Column, Integer, String, Text

from src.database import Base


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    jurisdiction = Column(String(255), nullable=True)
    program_name = Column(String(255), nullable=True)
    beneficiary = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    link = Column(Text, nullable=True)
    eligibility_requirements = Column(Text, nullable=True)
    minimum_age = Column(String(50), nullable=True)
    disability = Column(String(255), nullable=True)
    insurance = Column(String(255), nullable=True)
    caregiver_requirement = Column(Text, nullable=True)
    income_amount = Column(String(255), nullable=True)
    income_sources = Column(String(255), nullable=True)
    residency = Column(String(255), nullable=True)
    medical_status = Column(Text, nullable=True)
    program_enrollment_dependencies = Column(Text, nullable=True)
    citizenship = Column(String(255), nullable=True)
    criminal_records = Column(String(255), nullable=True)
