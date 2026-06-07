
import json
import joblib
import os

from sklearn.linear_model import (
    LogisticRegression
)

from sklearn.preprocessing import (
    LabelEncoder
)

# =========================
# BASE DIRECTORY
# =========================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

# =========================
# DATASET PATH
# =========================

dataset_path = os.path.join(

    BASE_DIR,

    "..",

    "datasets",

    "trainingData.json"

)

# =========================
# LOAD DATA
# =========================

with open(
    dataset_path,
    "r"
) as file:

    training_data = json.load(
        file
    )

# =========================
# FEATURES & LABELS
# =========================

X = []
y = []

for item in training_data:

    X.append(
        item["input"]
    )

    y.append(
        item["output"]
    )

# =========================
# LABEL ENCODER
# =========================

label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(
    y
)

# =========================
# MODEL
# =========================

model = LogisticRegression(

    max_iter=2000

)

# =========================
# TRAIN
# =========================

model.fit(
    X,
    y_encoded
)

# =========================
# SAVE
# =========================

models_dir = os.path.join(

    BASE_DIR,

    "..",

    "models"

)

os.makedirs(

    models_dir,

    exist_ok=True

)

# MODEL

joblib.dump(

    model,

    os.path.join(

        models_dir,

        "diseasePredictor.pkl"

    )

)

# LABEL ENCODER

joblib.dump(

    label_encoder,

    os.path.join(

        models_dir,

        "labelEncoder.pkl"

    )

)

print(
    "MODEL TRAINED SUCCESSFULLY"
)
