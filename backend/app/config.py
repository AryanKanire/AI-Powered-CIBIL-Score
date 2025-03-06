# config.py
import os

from dotenv import load_dotenv

load_dotenv()

# Load from environment variables or define defaults
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "credit_scoring_db")
