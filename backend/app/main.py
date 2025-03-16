# main.py

from fastapi import FastAPI
from app.routers.core_apis import core_router
from app.routers.xai_apis import xai_router
from app.routers.risk_apis import risk_router
from app.routers.data_ingestion_apis import data_ingestion_router
from app.routers.compliance_apis import compliance_router

app = FastAPI(
    title="AI-Powered Credit Scoring System",
    description="Endpoints for credit score calculation, risk assessment, data ingestion, compliance, etc.",
    version="1.0.0"
)


from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:5173"] for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Register routers with prefixes
app.include_router(core_router, prefix="/api")
app.include_router(xai_router, prefix="/api")
app.include_router(risk_router, prefix="/api")
app.include_router(data_ingestion_router, prefix="/api")
app.include_router(compliance_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to the AI-Powered Credit Scoring API!"}

# If you want to run with: python -m uvicorn app.main:app --reload
