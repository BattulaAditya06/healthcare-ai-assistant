

console.log(
  "ANALYZE CONTROLLER RUNNING"
);
const crypto=require("crypto");
const asyncHandler =
require("../utils/asyncHandler");


console.log(
  "CONTROLLER FILE:",
  __filename
);

const recommendDoctors =
require(
  "../appointments/services/doctorRecommendationService"
);

const {
  processSymptoms
} = require(
  "../services/nlpProcessingService"
);

console.log("nlp file loaded");

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

  // =========================
  // NLP PROCESSING
  // =========================

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

  // =========================
  // RESOLVED / PAST
  // =========================

  if (
    temporalStatus ===
      "resolved" ||

    temporalStatus ===
      "past"
  ) {

    symptoms = [];

  }

  // =========================
  // NO SYMPTOMS
  // =========================

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
        possibleDiseases: [],
        recommendedDoctors: []
      },

      "Symptoms appear related to temporary lifestyle, stress, workout, travel, or non-medical conditions."

    );

  }

  // =========================
  // EMERGENCY CHECK
  // =========================

  const emergency =
    calculateEmergency(
      symptoms,
      severity
    );

  // =========================
  // DISEASE PREDICTION
  // =========================

  const possibleDiseases =
    await predictDiseases(
      symptoms
    );

console.log(
  "PREDICTIONS TYPE:",
  typeof possibleDiseases
);

console.log(
  "IS ARRAY:",
  Array.isArray(
    possibleDiseases
  )
);

console.log(
  "FIRST PREDICTION:",
  possibleDiseases?.[0]
);


  // =========================
  // DOCTOR RECOMMENDATIONS
  // =========================

let recommendedDoctors = [];

if (

  Array.isArray(
    possibleDiseases
  ) &&

  possibleDiseases.length > 0

) {

  recommendedDoctors =
    recommendDoctors(

      possibleDiseases[0]
        .department

    ) || [];


}

console.log(
  "RECOMMENDED DOCTORS:",
  JSON.stringify(
    recommendedDoctors,
    null,
    2
  )
);


  // =========================
  // SESSION HANDLING
  // =========================

 // =========================
// TEMP SESSION
// =========================

const session = {

  sessionId:
    sessionId ||

    crypto.randomUUID(),

  symptoms

};

  // =========================
  // FOLLOW-UP QUESTIONS
  // =========================

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

console.log(

  "FINAL RESPONSE:",

  JSON.stringify(
    {
      recommendedDoctors
    },
    null,
    2
  )

);


  // =========================
  // RESPONSE
  // =========================

  
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

    possibleDiseases,

    recommendedDoctors

  },

  "Symptoms analyzed successfully"

);

});

module.exports = {
  analyzeSymptoms
};
