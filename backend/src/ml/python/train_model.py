import json
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Load training data
with open("../datasets/trainingData.json", "r") as file:
    data = json.load(file)

# Prepare dataset
X = [item["input"] for item in data]
y = [item["output"] for item in data]

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y_encoded)

# Save model
joblib.dump(
    model,
    "../models/diseasePredictor.pkl"
)

# Save encoder
joblib.dump(
    label_encoder,
    "../models/labelEncoder.pkl"
)

print("Model trained successfully")