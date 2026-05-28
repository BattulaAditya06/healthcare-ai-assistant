import os
import joblib

from fastapi import FastAPI
from pydantic import BaseModel

# FASTAPI APP
app = FastAPI()

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

# LOAD MODEL
model = joblib.load(

    os.path.join(
        models_dir,
        "diseasePredictor.pkl"
    )

)

# LOAD LABEL ENCODER
label_encoder = joblib.load(

    os.path.join(
        models_dir,
        "labelEncoder.pkl"
    )

)

# REQUEST MODEL
class PredictionRequest(
    BaseModel
):

    symptoms: list

# HEALTH ROUTE
@app.get("/")
def home():

    return {

        "message":
            "ML API Running"

    }

# PREDICTION ROUTE
@app.post("/predict")
def predict(
    request: PredictionRequest
):

    input_vector = (
        request.symptoms
    )

    # GET PROBABILITIES
    probabilities = (
        model.predict_proba(
            [input_vector]
        )[0]
    )

    # TOP 3 PREDICTIONS
    top_indices = (
        probabilities.argsort()[-3:][::-1]
    )

    predictions = []

    # BUILD RESPONSE
    for index in top_indices:

        disease = (
            label_encoder.inverse_transform(
                [index]
            )[0]
        )

        confidence = round(

            probabilities[index] * 100,

            2

        )

        predictions.append({

            "disease":
                disease,

            "confidence":
                confidence

        })

    return predictions