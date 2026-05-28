import os
import sys
import json
import joblib

# BASE DIRECTORY
BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

# MODELS DIRECTORY
models_dir = os.path.join(
    BASE_DIR,
    "..",
    "models"
)

# MODEL PATHS
model_path = os.path.join(
    models_dir,
    "diseasePredictor.pkl"
)

encoder_path = os.path.join(
    models_dir,
    "labelEncoder.pkl"
)

# LOAD MODEL
model = joblib.load(
    model_path
)

# LOAD LABEL ENCODER
label_encoder = joblib.load(
    encoder_path
)

# READ INPUT VECTOR
input_vector = json.loads(
    sys.argv[1]
)

# PREDICT PROBABILITIES
probabilities = model.predict_proba(
    [input_vector]
)

raw_confidence = max(
    probabilities[0]
) * 100

confidence = round(

    min(
        raw_confidence,
        85
    ),

    2
)

# PREDICT CLASS
prediction = model.predict(
    [input_vector]
)

# DECODE LABEL
disease = label_encoder.inverse_transform(
    prediction
)

# FINAL RESPONSE
result = {

    "disease":
        disease[0],

    "confidence":
        confidence

}

print(
    json.dumps(result)
)