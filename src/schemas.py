from pydantic import BaseModel


class ResourceSchema(BaseModel):
    id: int
    jurisdiction: str | None = None
    program_name: str | None = None
    beneficiary: str | None = None
    phone: str | None = None
    link: str | None = None
    eligibility_requirements: str | None = None
    minimum_age: str | None = None
    disability: str | None = None
    insurance: str | None = None
    caregiver_requirement: str | None = None
    income_amount: str | None = None
    income_sources: str | None = None
    residency: str | None = None
    medical_status: str | None = None
    program_enrollment_dependencies: str | None = None
    citizenship: str | None = None
    criminal_records: str | None = None

    model_config = {"from_attributes": True}


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    message: str
    success: bool
