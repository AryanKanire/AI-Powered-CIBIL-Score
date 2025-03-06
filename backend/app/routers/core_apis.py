from fastapi import APIRouter, HTTPException
from app.models.schemas import CreditScoreRequest, CreditScoreResponse
from app.ml.model_utils import predict_credit_score
from app.database import business_collection

core_router = APIRouter()

@core_router.post("/credit-score", response_model=CreditScoreResponse)
def calculate_credit_score(request: CreditScoreRequest):
    try:
        # Extracting the 14 features from the request (match the columns in 'X' dataframe)
        features = [
            request.Revenue,
            request.Expenses,
            request.Assets,
            request.Liabilities,
            request.Net_Profit,
            request.Cash_Flow,
            request.Transactions,
            request.Sentiment_Score,
            request.GST_Filing_Status,
            request.Profit_Margin,
            request.Debt_to_Asset_Ratio,
            request.Cash_Flow_Ratio,
            request.Expense_Ratio,
            request.Transaction_Intensity
        ]
        
        # Call the ML model to predict the credit score using the extracted features
        score = predict_credit_score(features)

        # Store the result in MongoDB
        # Use the business_id to identify the business in the database
        business_collection.update_one(
            {"business_id": request.business_id},  # Check if the business already exists
            {
                "$set": {
                    "credit_score": score,  # Update the credit score field
                    "Revenue": request.Revenue,
                    "Expenses": request.Expenses,
                    "Assets": request.Assets,
                    "Liabilities": request.Liabilities,
                    "Net_Profit": request.Net_Profit,
                    "Cash_Flow": request.Cash_Flow,
                    "Transactions": request.Transactions,
                    "Sentiment_Score": request.Sentiment_Score,
                    "GST_Filing_Status": request.GST_Filing_Status,
                    "Profit_Margin": request.Profit_Margin,
                    "Debt_to_Asset_Ratio": request.Debt_to_Asset_Ratio,
                    "Cash_Flow_Ratio": request.Cash_Flow_Ratio,
                    "Expense_Ratio": request.Expense_Ratio,
                    "Transaction_Intensity": request.Transaction_Intensity
                }
            },
            upsert=True  # If the business doesn't exist, create a new document
        )

        # Returning the credit score and justification
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
    risk_level = "HIGH" if request.Past_Defaults > 0 else "LOW"
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
