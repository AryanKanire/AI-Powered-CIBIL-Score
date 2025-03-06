# models/schemas.py

from pydantic import BaseModel
from typing import Optional

class CreditScoreRequest(BaseModel):
    business_id: int
    annual_revenue: float
    loan_amount: float
    gst_compliance: float
    past_defaults: int
    # ... more fields

class CreditScoreResponse(BaseModel):
    business_id: int
    credit_score: float
    justification: Optional[str] = None
