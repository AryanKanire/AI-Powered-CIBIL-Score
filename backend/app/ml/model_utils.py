# model_utils.py

import pickle
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "credit_model.pkl")

# Load model once at startup
with open(MODEL_PATH, "rb") as f:
    credit_model = pickle.load(f)

def predict_credit_score(features: list):
    """
    features: a list or array of numerical features
    return: float credit score
    """
    # Example: if using scikit-learn
    score = credit_model.predict([features])[0]
    return float(score)
