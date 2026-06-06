
const axios = require("axios");

const predictDisease =
require("./predictDisease");

const masterSymptoms =
require("../datasets/masterSymptoms.json");

// =========================
// CREATE VECTOR
// =========================

const createVector =
(symptoms = []) => {

  return masterSymptoms.map(

    (symptom) =>

      symptoms.includes(
        symptom
      )

        ? 1

        : 0

  );

};

// =========================
// MERGE PREDICTIONS
// =========================

const mergePredictions =
(
  rulePredictions = [],

  mlPrediction = null
) => {

  if (
    !mlPrediction
  ) {

    return rulePredictions;

  }

  return rulePredictions.map(

    (prediction) => {

      // =====================
      // MATCHED DISEASE
      // =====================

      if (

        prediction.disease ===

        mlPrediction.disease

      ) {

        const mergedConfidence =

          (

            prediction.confidence *

            0.45

          ) +

          (

            mlPrediction.confidence *

            0.55

          );

        return {

          ...prediction,

          confidence:
            Number(
              mergedConfidence.toFixed(1)
            ),

          predictionType:
            "Hybrid AI Prediction"

        };

      }

      // =====================
      // NON-ML MATCH
      // =====================

      return {

        ...prediction,

        predictionType:
          "Weighted Prediction"

      };

    }

  )

  .sort(
    (a, b) =>

      b.confidence -
      a.confidence
  );

};

// =========================
// HYBRID PREDICTOR
// =========================

const hybridPredictor =
async (

  symptoms = [],

  negativeSymptoms = []

) => {

  // =====================
  // RULE ENGINE
  // =====================

  const rulePredictions =
    predictDisease(

      symptoms,

      negativeSymptoms

    );

  try {

    // =====================
    // VECTOR
    // =====================

    const vector =
      createVector(
        symptoms
      );

    console.log(
      "VECTOR:",
      vector
    );

    // =====================
    // VALIDATION
    // =====================

    if (

      !Array.isArray(
        vector
      )

    ) {

      throw new Error(
        "Invalid vector format"
      );

    }

    // =====================
    // ML REQUEST
    // =====================

    const response =
      await axios.post(

        "http://127.0.0.1:8000/predict",

        {

          vector:
            vector.map(
              Number
            )

        },

        {

          headers: {

            "Content-Type":
              "application/json"

          }

        }

      );

    // =====================
    // ML RESPONSE
    // =====================

    const mlPrediction =
      response.data;

    console.log(
      "ML PREDICTION:",
      mlPrediction
    );

    // =====================
    // VALIDATE RESPONSE
    // =====================

    if (

      !mlPrediction ||

      !mlPrediction.disease

    ) {

      throw new Error(
        "Invalid ML response"
      );

    }

    // =====================
    // MERGE
    // =====================

    return mergePredictions(

      rulePredictions,

      mlPrediction

    );

  } catch (error) {

    console.log(

      "ML Prediction Error:",

      error.response?.data ||

      error.message

    );

    // =====================
    // SAFE FALLBACK
    // =====================

    return rulePredictions;

  }

};

module.exports =
  hybridPredictor;
