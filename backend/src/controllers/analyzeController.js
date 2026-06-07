console.log(
  "ANALYZE CONTROLLER RUNNING"
);

const {
  getAppointmentPriority
} = require(
  "../appointments/services/appointmentPriorityService"
);

const crypto =
require("crypto");

const asyncHandler =
require("../utils/asyncHandler");

console.log(
  "CONTROLLER FILE:",
  __filename
);

// =========================
// SERVICES
// =========================

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
  predictDisease
} = require(
  "../services/mlService"
);

const recommendDoctors =
require(
  "../appointments/services/doctorRecommendationService"
);

// =========================
// UTILITIES
// =========================

const {
  successResponse
} = require(
  "../utils/apiResponse"
);

const followUpQuestions =
require(
  "../utils/followUpQuestions"
);

// =========================
// ANALYZE CONTROLLER
// =========================

const analyzeSymptoms =
asyncHandler(

  async (
    req,
    res
  ) => {

    // =====================
    // REQUEST BODY
    // =====================

    let {

      symptoms = [],

      message = "",

      sessionId = null,

      removeSymptoms = []

    } = req.body;

    // =====================
    // VALIDATION
    // =====================

    if (

      typeof message !==
      "string"

    ) {

      return res.status(400)
        .json({

          success: false,

          message:
            "Message must be a string"

        });

    }

    // =====================
    // NLP PROCESSING
    // =====================

    const processedData =

      processSymptoms(

        message,

        symptoms

      );

    symptoms =
      processedData.symptoms || [];

    const severity =
      processedData.severity ||
      "low";

    const temporalStatus =
      processedData.temporalStatus ||
      "active";

    console.log(
      "FINAL SYMPTOMS:",
      symptoms
    );

    // =====================
    // RESOLVED / PAST
    // =====================

    if (

      temporalStatus ===
        "resolved" ||

      temporalStatus ===
        "past"

    ) {

      symptoms = [];

    }

    // =====================
    // NO SYMPTOMS
    // =====================

    if (

      symptoms.length === 0 &&

      removeSymptoms.length === 0

    ) {

      return successResponse(

        res,

        {

          sessionId:

            sessionId ||

            crypto.randomUUID(),

          emergency: false,

          severity,

          temporalStatus,

          enteredSymptoms: [],

          normalizedSymptoms: [],

          possibleDiseases: [],

          topPrediction: null,

          recommendedDoctors: [],

          followUpQuestions: [],

          analysisMetadata: {

            symptomCount: 0,

            predictionCount: 0

          }

        },

        "No medically significant symptoms detected"

      );

    }

    // =====================
    // EMERGENCY CHECK
    // =====================

    const emergency =

      calculateEmergency(

        symptoms,

        severity

      );

   // =====================
// DISEASE PREDICTION
// =====================

const possibleDiseases =
  await predictDisease(
    symptoms
  ) || [];

console.log(
  "ML PREDICTIONS:",
  possibleDiseases
);


    // =====================
    // TOP PREDICTION
    // =====================

    const topPrediction =

      possibleDiseases[0] ||
      null;

      const appointmentPriority =

  getAppointmentPriority(

    severity,

    emergency,

    topPrediction?.riskLevel

  );

// =========================
// DOCTOR RECOMMENDATIONS
// =========================

let recommendedDoctors = [];

console.log(
  "TOP PREDICTION:",
  topPrediction
);

if (

  topPrediction &&

  topPrediction.department

) {

  recommendedDoctors =

    recommendDoctors(

      topPrediction.department

    );

}

console.log(

  "RECOMMENDED DOCTORS:",

  JSON.stringify(
    recommendedDoctors,
    null,
    2
  )

);

    console.log(
      "RECOMMENDED DOCTORS:",
      recommendedDoctors
    );

    // =====================
    // FOLLOW-UP QUESTIONS
    // =====================

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

    // =====================
    // SESSION
    // =====================

    const finalSessionId =

      sessionId ||

      crypto.randomUUID();

    // =====================
    // RESPONSE
    // =====================

    return successResponse(

      res,

      {

        sessionId:
          finalSessionId,

        emergency: {

  isEmergency:
    emergency,

  severity,

  matchedSymptoms:

    symptoms.filter(

      (symptom) =>

        [

          "chest pain",
          "difficulty breathing",
          "shortness of breath",
          "loss of consciousness",
          "seizures",
          "cough with blood"

        ].includes(symptom)

    )

},

        severity,

        temporalStatus,

        enteredSymptoms:
          symptoms,

        normalizedSymptoms:
          symptoms,

        possibleDiseases,

        topPrediction,

        recommendedDoctors,

        appointmentPriority,

        followUpQuestions:
          questions,

        analysisMetadata: {

          symptomCount:
            symptoms.length,

          predictionCount:
            possibleDiseases.length,

            emergency

        }

      },

      "Symptoms analyzed successfully"

    );

  }

);

module.exports = {
  analyzeSymptoms
};