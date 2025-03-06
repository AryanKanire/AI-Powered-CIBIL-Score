# model_utils.py

import pickle
import os
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "credit_model.pkl")

# Load model once at startup
with open(MODEL_PATH, "rb") as f:
    credit_model, model_scaler = pickle.load(f)

def predict_credit_score(features: list):
    """
    features: a list or array of numerical features
    return: float credit score
    """
    # Ensure input is a 2D array for scaler
    features = np.array(features).reshape(1, -1)
    
    # Scale the input features
    scaled_features = model_scaler.transform(features)

    # Example: if using scikit-learn
    score = credit_model.predict([scaled_features])[0]
    return float(score)
