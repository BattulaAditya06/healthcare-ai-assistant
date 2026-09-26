const axios = require("axios");
const cache = require("./predictionCache");

const normalizeSymptomsForML = (symptoms = []) => {

  return symptoms.map((symptom) => {

    if (symptom === "migraine") {
      return "headache";
    }

    return symptom;

  });

};

const normalizePrediction = (prediction = {}) => {

  return {
    disease:
      prediction.disease || "Unknown",

    confidence:
      Number(prediction.confidence || 0),

    riskLevel:
      prediction.riskLevel || "unknown",

    department:
      prediction.department || "General Medicine",

    predictionType:
      "ML Prediction"
  };

};

const predictDisease = async (symptoms = []) => {

  const mlSymptoms =
    normalizeSymptomsForML(symptoms);

  const key =
    [...mlSymptoms]
      .sort()
      .join(",");

  const cached =
    cache.get(key);

  if (cached) {

    console.log("CACHE HIT");

    return cached;

  }

  try {

    console.log(
      "ML INPUT SYMPTOMS:",
      mlSymptoms
    );

    console.time("ML_REQUEST");

    const response =
      await axios.post(

        `${process.env.ML_SERVICE_URL}/predict`,

        {
          symptoms: mlSymptoms
        },

        {
          timeout: 30000
        }

      );

    console.timeEnd("ML_REQUEST");

    console.log(
      "ML RESPONSE:",
      response.data
    );

    const predictions =

      Array.isArray(response.data)

        ? response.data

        : [response.data];

    const normalizedPredictions =
      predictions.map(
        normalizePrediction
      );

    cache.set(
      key,
      normalizedPredictions
    );

    return normalizedPredictions;

  } catch (error) {

    console.error(
      "ML SERVICE ERROR:",
      error.message
    );

    return [
      {
        disease:
          "Prediction Service Unavailable",

        confidence:
          0,

        riskLevel:
          "unknown",

        department:
          "General Medicine",

        predictionType:
          "ML Prediction"
      }
    ];

  }

};

module.exports = {
  predictDisease
};