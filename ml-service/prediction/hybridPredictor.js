const axios = require("axios");

const predictDisease =
require("./predictDisease");

const masterSymptoms =
require("../datasets/masterSymptoms.json");

// =========================
// VECTOR CREATION
// =========================

const createVector =
(symptoms = []) => {

  return masterSymptoms.map(

    symptom =>

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

const mergePredictions = (

  rulePredictions = [],

  mlPrediction = null

) => {

  if (!mlPrediction) {

    return rulePredictions;

  }

  const diseaseExists =

    rulePredictions.some(

      prediction =>

        prediction.disease ===

        mlPrediction.disease

    );

  const mergedPredictions =

    rulePredictions.map(

      prediction => {

        if (

          prediction.disease ===

          mlPrediction.disease

        ) {

          const mergedConfidence =

            (

              prediction.confidence *

              0.4

            ) +

            (

              mlPrediction.confidence *

              0.6

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

        return prediction;

      }

    );

  if (!diseaseExists) {

    mergedPredictions.unshift({

      disease:
        mlPrediction.disease,

      confidence:
        mlPrediction.confidence,

      predictionType:
        "ML Prediction",

      riskLevel:
        mlPrediction.riskLevel ||
        "unknown",

      department:
        mlPrediction.department ||
        "General Medicine"

    });

  }

  return mergedPredictions

    .sort(

      (a, b) =>

        b.confidence -

        a.confidence

    )

    .slice(0, 3);

};

// =========================
// HYBRID PREDICTOR
// =========================

const hybridPredictor =
async (

  symptoms = [],

  negativeSymptoms = []

) => {

  const rulePredictions =

    predictDisease(

      symptoms,

      negativeSymptoms

    );

  try {

    const vector =

      createVector(
        symptoms
      );

    const response =

      await axios.post(

        `${process.env.ML_SERVICE_URL}/predict`,

        {

          vector:
            vector.map(Number)

        },

        {

          timeout: 10000,

          headers: {

            "Content-Type":
              "application/json"

          }

        }

      );

    const mlPrediction =
      response.data;

    if (

      !mlPrediction ||

      !mlPrediction.disease

    ) {

      return rulePredictions;

    }

    return mergePredictions(

      rulePredictions,

      mlPrediction

    );

  } catch (error) {

    console.log(

      "ML Prediction Error:",

      error.message

    );

    if (

      rulePredictions.length > 0

    ) {

      return rulePredictions;

    }

    return [

      {

        disease:
          "Insufficient Information",

        confidence: 0,

        riskLevel: "unknown",

        department:
          "General Medicine",

        recommendations: [

          "Please provide more symptoms"

        ]

      }

    ];

  }

};

module.exports =
  hybridPredictor;