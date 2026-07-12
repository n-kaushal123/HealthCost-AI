from pydantic import BaseModel
from typing import Optional

class TriageRequest(BaseModel):
    symptoms: str
    age: int
    duration_days: int

class TriageResponse(BaseModel):
    urgency: str
    reason: str

class CostRequest(BaseModel):
    urgency: str
    region: str
    country: str
    condition_type: Optional[str] = None

class CostRange(BaseModel):
    min: float
    max: float
    currency: str

class CostBreakdown(BaseModel):
    consultation: CostRange
    tests: CostRange
    medicine: CostRange

class CostResponse(BaseModel):
    cost_range: CostRange
    breakdown: CostBreakdown

class DelayImpactRequest(BaseModel):
    condition: str
    country: str
    months_delayed: int

class DelayImpactResponse(BaseModel):
    early_cost: float
    delayed_cost: float
    currency: str
    explanation: str

class AskRequest(BaseModel):
    message: str
    symptoms: str
    age: int
    duration_days: int
    region: str
    condition_type: Optional[str] = None
    months_delayed: Optional[int] = 0

class AskResponse(BaseModel):
    reply: str
