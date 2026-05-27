import os
import sys
import json
import joblib

# Base directory
BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

# Model paths
model_path = os.path.join(
    BASE_DIR,
    "../models/diseasePredictor.pkl"
)

encoder_path = os.path.join(
    BASE_DIR,
    "../models/labelEncoder.pkl"
)

# Load model
model = joblib.load(model_path)

# Load label encoder
label_encoder = joblib.load(
    encoder_path
)

# Read vector
input_vector = json.loads(
    sys.argv[1]
)

# Predict probabilities
probabilities = model.predict_proba(
    [input_vector]
)

confidence = round(
    max(probabilities[0]) * 100,
    2
)

# Predict disease
prediction = model.predict(
    [input_vector]
)

# Decode prediction
disease = label_encoder.inverse_transform(
    prediction
)

# Final JSON response
result = {

    "disease": disease[0],

    "confidence": confidence

}

print(json.dumps(result))