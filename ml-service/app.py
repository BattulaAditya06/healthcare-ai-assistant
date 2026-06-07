from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# =========================
# REQUEST MODEL
# =========================

class SymptomsRequest(BaseModel):
    symptoms: list[str]

# =========================
# HEALTH CHECK
# =========================

@app.get("/")
def health():
    return {
        "status": "ML service running"
    }

# =========================
# PREDICTION API
# =========================

@app.post("/predict")
def predict(data: SymptomsRequest):

    symptoms = data.symptoms

    print("RECEIVED SYMPTOMS:", symptoms)

    # ====================================
    # TEMPORARY MOCK RESPONSE
    # Replace with real model later
    # ====================================

    return [
        {
            "disease": "COVID-19",
            "confidence": 91,
            "riskLevel": "high",
            "department": "General Medicine"
        }
    ]