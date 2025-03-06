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
        business_collection.update_one(
            {"business_id": request.business_id},
            {
                "$set": {
                    "credit_score": score,
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

# New Endpoint to Get All Businesses
@core_router.get("/get-businesses")
def get_all_businesses():
    try:
        # Fetch all businesses from MongoDB
        businesses = list(business_collection.find({}))  # Retrieves all records

        # Convert MongoDB documents to a more friendly format (excluding Mongo's _id)
        businesses = [
            {
                "business_id": business.get("business_id"),
                "Company": business.get("Company"),
                "Revenue": business.get("Revenue"),
                "Expenses": business.get("Expenses"),
                "Assets": business.get("Assets"),
                "Liabilities": business.get("Liabilities"),
                "Net_Profit": business.get("Net_Profit"),
                "Cash_Flow": business.get("Cash_Flow"),
                "Transactions": business.get("Transactions"),
                "Sentiment_Score": business.get("Sentiment_Score"),
                "GST_Filing_Status": business.get("GST_Filing_Status"),
                "Profit_Margin": business.get("Profit_Margin"),
                "Debt_to_Asset_Ratio": business.get("Debt_to_Asset_Ratio"),
                "Cash_Flow_Ratio": business.get("Cash_Flow_Ratio"),
                "Expense_Ratio": business.get("Expense_Ratio"),
                "Transaction_Intensity": business.get("Transaction_Intensity"),
            }
            for business in businesses
        ]

        return {"businesses": businesses}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
