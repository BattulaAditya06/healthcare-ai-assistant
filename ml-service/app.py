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

    symptoms = [

        symptom.lower()

        for symptom in data.symptoms

    ]

    print(
        "RECEIVED SYMPTOMS:",
        symptoms
    )

    predictions = []

    # =========================
    # COVID-19
    # =========================

    if (

        "fever" in symptoms and
        "cough" in symptoms

    ):

        predictions.append({

            "disease":
                "COVID-19",

            "confidence":
                91,

            "riskLevel":
                "high",

            "department":
                "Pulmonology"

        })

    # =========================
    # MALARIA
    # =========================

    if (

        "fever" in symptoms and
        "chills" in symptoms

    ):

        predictions.append({

            "disease":
                "Malaria",

            "confidence":
                88,

            "riskLevel":
                "high",

            "department":
                "Infectious Disease"

        })

    # =========================
    # FLU
    # =========================

    if (

        "fever" in symptoms and
        "body pain" in symptoms

    ):

        predictions.append({

            "disease":
                "Flu",

            "confidence":
                84,

            "riskLevel":
                "medium",

            "department":
                "General Medicine"

        })

    # =========================
    # MIGRAINE
    # =========================

    if (

        "headache" in symptoms and
        "nausea" in symptoms

    ):

        predictions.append({

            "disease":
                "Migraine",

            "confidence":
                82,

            "riskLevel":
                "medium",

            "department":
                "Neurology"

        })

    # =========================
    # DIABETES
    # =========================

    if (

        "frequent urination" in symptoms and
        "increased thirst" in symptoms

    ):

        predictions.append({

            "disease":
                "Diabetes",

            "confidence":
                86,

            "riskLevel":
                "medium",

            "department":
                "Endocrinology"

        })

    # =========================
    # PNEUMONIA
    # =========================

    if (

        "fever" in symptoms and
        "shortness of breath" in symptoms

    ):

        predictions.append({

            "disease":
                "Pneumonia",

            "confidence":
                89,

            "riskLevel":
                "high",

            "department":
                "Pulmonology"

        })

    # =========================
    # DEFAULT
    # =========================

    if len(predictions) == 0:

        predictions.append({

            "disease":
                "General Viral Infection",

            "confidence":
                60,

            "riskLevel":
                "low",

            "department":
                "General Medicine"

        })

    return predictions

