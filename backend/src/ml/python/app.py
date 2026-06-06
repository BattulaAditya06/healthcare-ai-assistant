
from fastapi import FastAPI

from pydantic import BaseModel

import joblib

import os

# =========================
# BASE DIRECTORY
# =========================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

# =========================
# LOAD MODEL
# =========================

model = joblib.load(

    os.path.join(

        BASE_DIR,

        "..",

        "models",

        "diseasePredictor.pkl"

    )

)

labelEncoder = joblib.load(

    os.path.join(

        BASE_DIR,

        "..",

        "models",

        "labelEncoder.pkl"

    )

)

# =========================
# FASTAPI
# =========================

app = FastAPI()

# =========================
# REQUEST MODEL
# =========================

class PredictionRequest(
    BaseModel
):

    vector: list[int]

# =========================
# HEALTH CHECK
# =========================

@app.get("/")

def home():

    return {

        "success": True,

        "message":
        "ML API RUNNING"

    }

# =========================
# PREDICT
# =========================

@app.post("/predict")

def predict(
    request:
    PredictionRequest
):

    predictionEncoded = model.predict(

        [request.vector]

    )[0]

    probabilities = model.predict_proba(

        [request.vector]

    )[0]

    confidence = max(
        probabilities
    ) * 100

    disease = labelEncoder.inverse_transform(

        [predictionEncoded]

    )[0]

    return {

        "disease":
        disease,

        "confidence":
        round(
            confidence,
            1
        )

    }
