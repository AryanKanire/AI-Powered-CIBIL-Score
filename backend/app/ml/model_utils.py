import pickle
import os
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "credit_score_model.pkl")

# Load model once at startup
with open(MODEL_PATH, "rb") as f:
    credit_model, model_scaler = pickle.load(f)

def predict_credit_score(features: list):
    """
    features: a list or array of numerical features
    return: float credit score
    """
    try:
        # Ensure input is a 2D array for the scaler
        features = np.array(features).reshape(1, -1)
        
        # Scale the input features
        scaled_features = model_scaler.transform(features)
        
        # Predict the score using the model
        score = credit_model.predict(scaled_features)[0]
        
        return float(score)
    
    except Exception as e:
        raise ValueError(f"Error during prediction: {e}")
