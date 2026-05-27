const extractSymptoms =
require("../ml/preprocess/symptomExtractor");

const {
  predictDiseases
} = require("./diseasePredictionService");


const processChatMessage =
async (userMessage) => {

  try {

    // Step 1 — Extract Symptoms
    const detectedSymptoms =
      extractSymptoms(userMessage);



    // Step 2 — Validate Symptoms
    if (
      detectedSymptoms.length === 0
    ) {

      return {

        success: false,

        message:
          "No valid symptoms detected.",

        enteredSymptoms: [],

        possibleDiseases: []

      };

    }

    // Step 3 — Predict Diseases

    const predictions =
      await predictDiseases(
        detectedSymptoms
      );

    // Step 4 — Return Response
    return {

      success: true,

      message:
        predictions.length > 0
          ? "Possible diseases detected."
          : "No matching disease found.",

      enteredSymptoms:
        detectedSymptoms,

      possibleDiseases:
        predictions

    };

  } catch (error) {

    console.error(
      "Chat Service Error:",
      error.message
    );

    return {

      success: false,

      message:
        "Internal server error.",

      enteredSymptoms: [],

      possibleDiseases: []

    };

  }

};

module.exports = {
  processChatMessage
};