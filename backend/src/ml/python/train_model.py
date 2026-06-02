import json
import joblib
import os

from sklearn.ensemble import (
    RandomForestClassifier
)

from sklearn.preprocessing import (
    LabelEncoder
)

# BASE DIRECTORY
BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

# DATASET PATH
dataset_path = os.path.join(
    BASE_DIR,
    "..",
    "datasets",
    "trainingData.json"
)

# LOAD TRAINING DATA
with open(dataset_path, "r") as file:

    training_data = json.load(file)

# PREPARE FEATURES & LABELS
X = []
y = []

for item in training_data:

    X.append(item["input"])

    y.append(item["output"])

# LABEL ENCODING
label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

# TRAIN MODEL
model = RandomForestClassifier(

    n_estimators=100,

    random_state=42

)

model.fit(X, y_encoded)

# MODELS DIRECTORY
models_dir = os.path.join(
    BASE_DIR,
    "..",
    "models"
)

os.makedirs(
    models_dir,
    exist_ok=True
)

# SAVE MODEL
joblib.dump(

    model,

    os.path.join(
        models_dir,
        "diseasePredictor.pkl"
    )

)

# SAVE LABEL ENCODER
joblib.dump(

    label_encoder,

    os.path.join(
        models_dir,
        "labelEncoder.pkl"
    )

)

print(
    "Model trained successfully."
)