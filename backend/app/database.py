# database.py

from pymongo import MongoClient
from app.config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Example collections
transaction_collection = db["transactions"]
gst_collection = db["gst_details"]
business_collection = db["business_info"]
audit_logs_collection = db["audit_logs"]
# ... add more as needed
