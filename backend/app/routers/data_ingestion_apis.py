# data_ingestion_apis.py

from fastapi import APIRouter, UploadFile, File
from typing import List

data_ingestion_router = APIRouter()

@data_ingestion_router.post("/ingest-data")
async def ingest_data(file: UploadFile = File(...)):
    # Example: parse CSV/JSON and store in MongoDB
    # content = await file.read()
    # parse & insert into DB
    return {"status": "Data ingested successfully"}

@data_ingestion_router.post("/batch-credit-scores")
def batch_credit_scores(business_data: List[dict]):
    # Accepts a list of businesses with their data
    # Runs credit score calculation in bulk
    results = []
    for item in business_data:
        # run model, store in results
        results.append({"business_id": item["business_id"], "score": 700})
    return {"batch_results": results}
