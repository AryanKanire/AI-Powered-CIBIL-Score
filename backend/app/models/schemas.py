from pydantic import BaseModel
from typing import Optional

class CreditScoreRequest(BaseModel):
    business_id: int
    Revenue: float
    Expenses: float
    Assets: float
    Liabilities: float
    Net_Profit: float
    Cash_Flow: float
    Transactions: int
    Sentiment_Score: float
    GST_Filing_Status: int  # Assuming 1 for compliant, 0 for non-compliant
    Profit_Margin: float
    Debt_to_Asset_Ratio: float
    Cash_Flow_Ratio: float
    Expense_Ratio: float
    Transaction_Intensity: float
    Loan_Amount: float
    GST_Compliance: int  # Assuming 1 for compliant, 0 for non-compliant
    Past_Defaults: int

class CreditScoreResponse(BaseModel):
    business_id: int
    credit_score: float
    justification: Optional[str] = None
