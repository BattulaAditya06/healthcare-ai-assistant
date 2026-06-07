const axios = require(
  "axios"
);

const {
  encodeSymptoms
} = require(
  "../encoders/symptomEncoder"
);

const mlPredictor =
async (symptoms) => {

  try {

    // ENCODE SYMPTOMS
    const vector =
      encodeSymptoms(
        symptoms
      );

    // CALL FASTAPI
    const response =
      await axios.post(

        "http://127.0.0.1:8000/predict",

        {

          symptoms:
            vector

        }

      );

    // RETURN TOP PREDICTIONS
    return response.data;

  } catch (error) {

    console.log(
      "ML Prediction Error:",
      error.message
    );

    return [];

  }

};

module.exports =
mlPredictor;