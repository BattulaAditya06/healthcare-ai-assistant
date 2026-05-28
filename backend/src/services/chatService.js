const extractSymptoms = require(
  "../ml/preprocess/symptomExtractor"
);

const hybridPredictor = require(
  "../ml/prediction/hybridPredictor"
);

const detectEmergency =
require(
  "../ml/preprocess/emergencyDetector"
);

const chatService =
async (message) => {

  try {

    // EXTRACT SYMPTOMS
    const symptoms =
      extractSymptoms(message);

    console.log(
      "Detected Symptoms:",
      symptoms
    );

    // EMERGENCY CHECK
const emergencyCheck =
  detectEmergency(
    symptoms
  );

if (
  emergencyCheck.isEmergency
) {

  return {

    success: true,

    emergency: true,

    message:
      "Emergency symptoms detected. Seek immediate medical attention.",

    enteredSymptoms:
      symptoms,

    emergencySymptoms:
      emergencyCheck.matchedSymptoms,

    possibleDiseases: []

  };

}

    // NO SYMPTOMS
    if (
      !symptoms ||
      symptoms.length === 0
    ) {

      return {

        success: false,

        message:
          "No valid symptoms detected.",

        enteredSymptoms: [],

        possibleDiseases: []

      };

    }

    // PREDICT DISEASE
    const predictions =
      await hybridPredictor(
        symptoms
      );

    // NO PREDICTION
    if (
      !predictions ||
      predictions.length === 0
    ) {

      return {

        success: true,

        message:
          "No matching disease found.",

        enteredSymptoms:
          symptoms,

        possibleDiseases: []

      };

    }

    // SUCCESS
    return {

      success: true,

      message:
        "Possible diseases detected.",

      enteredSymptoms:
        symptoms,

      possibleDiseases:
        predictions

    };

  } catch (error) {

    console.log(
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

module.exports =
chatService;