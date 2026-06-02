const asyncHandler =
require("../utils/asyncHandler");

const {
  processSymptoms
} = require(
  "../services/nlpProcessingService"
);

const {
  calculateEmergency
} = require(
  "../services/emergencyService"
);

const {
  predictDiseases
} = require(
  "../services/diseasePredictionService"
);

const {
  handleSession
} = require(
  "../services/sessionService"
);

const {
  successResponse
} = require(
  "../utils/apiResponse"
);

const followUpQuestions =
require(
  "../utils/followUpQuestions"
);

const analyzeSymptoms =
asyncHandler(async (
  req,
  res
) => {

  let {
    symptoms,
    message,
    sessionId,
    removeSymptoms
  } = req.body;

  const processedData =
    processSymptoms(
      message,
      symptoms
    );

  symptoms =
    processedData.symptoms;

  const severity =
    processedData.severity;

  const temporalStatus =
    processedData.temporalStatus;

  if (
    temporalStatus ===
      "resolved" ||
    temporalStatus ===
      "past"
  ) {

    symptoms = [];

  }

  if (
    (!symptoms ||
      symptoms.length === 0) &&

    (!removeSymptoms ||
      removeSymptoms.length === 0)
  ) {

    return successResponse(
      res,
      {
        enteredSymptoms: [],
        possibleDiseases: []
      },

      "Symptoms appear related to temporary lifestyle, stress, workout, travel, or non-medical conditions."
    );

  }

  const emergency =
    calculateEmergency(
      symptoms,
      severity
    );

  const possibleDiseases =
    await predictDiseases(
      symptoms
    );

  const session =
    await handleSession(
      sessionId,
      symptoms,
      removeSymptoms
    );

  let questions = [];

  symptoms.forEach(
    (symptom) => {

      if (
        followUpQuestions[
          symptom
        ]
      ) {

        questions.push(
          ...followUpQuestions[
            symptom
          ]
        );

      }

    }
  );

  questions = [
    ...new Set(questions)
  ];

  return successResponse(

    res,

    {
      sessionId:
        session.sessionId,

      emergency,

      enteredSymptoms:
        symptoms,

      followUpQuestions:
        questions,

      possibleDiseases

    },

    "Symptoms analyzed successfully"

  );

});

module.exports = {
  analyzeSymptoms
};