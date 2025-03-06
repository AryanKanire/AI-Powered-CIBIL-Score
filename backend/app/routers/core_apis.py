# core_apis.py

from fastapi import APIRouter, HTTPException
from app.models.schemas import CreditScoreRequest, CreditScoreResponse
from app.ml.model_utils import predict_credit_score
from app.database import business_collection

core_router = APIRouter()

@core_router.post("/credit-score", response_model=CreditScoreResponse)
def calculate_credit_score(request: CreditScoreRequest):
    try:
        # Example feature extraction:
        features = [
            request.annual_revenue,
            request.loan_amount,
            request.gst_compliance,
            request.past_defaults
            # etc.
        ]
        score = predict_credit_score(features)

        # You might want to store the result in the DB
        # business_collection.update_one(
        #     {"business_id": request.business_id},
        #     {"$set": {"credit_score": score}},
        #     upsert=True
        # )

        return CreditScoreResponse(
            business_id=request.business_id,
            credit_score=score,
            justification="Detailed justification or partial SHAP info here"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@core_router.post("/risk-assessment")
def risk_assessment(request: CreditScoreRequest):
    # Dummy logic for demonstration
    risk_level = "HIGH" if request.past_defaults > 0 else "LOW"
    return {"business_id": request.business_id, "risk_level": risk_level}

@core_router.get("/transaction-history/{business_id}")
def get_transaction_history(business_id: int):
    # Example: retrieve from MongoDB
    transactions = []  # transaction_collection.find(...)
    return {"business_id": business_id, "transactions": transactions}

@core_router.get("/gst-details/{business_id}")
def get_gst_details(business_id: int):
    # Example: retrieve from MongoDB
    gst_info = {}  # gst_collection.find_one(...)
    return {"business_id": business_id, "gst_details": gst_info}

@core_router.get("/financial-report/{business_id}")
def financial_report(business_id: int):
    # Example: retrieve from DB or compute
    return {"business_id": business_id, "report": "Financial details..."}

@core_router.get("/macroeconomic-factors/{business_id}")
def macroeconomic_factors(business_id: int):
    # Example: retrieve from an external API or DB
    return {"business_id": business_id, "factors": "Economic indicators..."}
