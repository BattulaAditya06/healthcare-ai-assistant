const crypto =
require("crypto");

const temporalAnalyzer =
require("../utils/temporalAnalyzer");

const severityAnalyzer =
require("../utils/severityAnalyzer");

const emergencyDetector =
require("../utils/emergencyDetector");

const {
  processSymptoms
} = require(
  "../services/nlpProcessingService"
);

const predictionService =
require(
  "../services/predictionService"
);

const {
  predictDisease:
  mlPredictDisease
} = require(
  "../services/mlService"
);

const recommendDoctors =
require(
  "../appointments/services/doctorRecommendationService"
);

// =========================
// TEMP IN-MEMORY CHAT
// =========================

const messages = [];

// =========================
// ANALYZE CHAT
// =========================

const analyzeChat =
async (req, res) => {

  console.time(
    "TOTAL_CHAT"
  );

  try {

    const {
      message = ""
    } = req.body;

    // =====================
    // NLP PROCESSING
    // =====================

    const processedData =

      processSymptoms(
        message
      );

    const symptoms =

      processedData
        ?.symptoms || [];

        const temporalData =
  temporalAnalyzer(
    message
  );

const severityData =
  severityAnalyzer(
    message
  );

const emergencyData =
  processSymptoms(
    message
  );

console.log(
  "EMERGENCY DATA:",
  emergencyData
);

console.log(
  "TEMPORAL:",
  temporalData
);

console.log(
  "SEVERITY:",
  severityData
);

console.log(
  "EMERGENCY:",
  emergencyData
);

   // =====================
// EMPTY SYMPTOMS
// =====================

if (
  symptoms.length === 0
) {

  console.timeEnd(
    "TOTAL_CHAT"
  );

  return res.json({

    success: true,

    message:
      "No symptoms detected. Please describe your symptoms.",

    enteredSymptoms: [],

    analysis: {

      temporal:
        temporalData,

      severity:
        severityData,

      emergency:
        emergencyData

    },

    possibleDiseases: [],

    recommendedDoctors: []

  });

}

// =====================
// INSUFFICIENT SYMPTOMS
// =====================

const hasMeaningfulContext =

  (temporalData?.durationDays || 0) >= 3 ||

  severityData?.level === "high";

if (
  symptoms.length < 2
) {

  let followUpQuestions = [

    "Can you describe any additional symptoms?",

    "How long have you been experiencing this symptom?",

    "Has the symptom become worse over time?"

  ];

  if (
    symptoms.includes(
      "wrist pain"
    )
  ) {

    followUpQuestions = [

      "Do you have swelling?",

      "Was there a recent injury?",

      "Do you have numbness or tingling?",

      "How long have you had the pain?"

    ];

  }

  if (
    symptoms.includes(
      "headache"
    )
  ) {

    followUpQuestions = [

      "Do you have nausea?",

      "Are you sensitive to light?",

      "Do you have dizziness?",

      "How long has the headache lasted?"

    ];

  }

  if (
    symptoms.includes(
      "fever"
    )
  ) {

    followUpQuestions = [

      "Do you have cough?",

      "Do you have chills?",

      "Have you noticed body pain?",

      "How many days have you had fever?"

    ];

  }

  console.timeEnd(
    "TOTAL_CHAT"
  );

  return res.json({

    success: true,

    message:
      "More information is needed for a reliable prediction.",

urgentFollowup:
  hasMeaningfulContext,

    enteredSymptoms:
      symptoms,

    analysis: {

      temporal:
        temporalData,

      severity:
        severityData,

      emergency:
        emergencyData

    },

    followUpQuestions,

    possibleDiseases: [],

    recommendedDoctors: []

  });

}
    // =====================
    // PREDICTION
    // =====================

    console.log(
      "BEFORE PREDICTION"
    );

    let possibleDiseases =

      predictionService(
        symptoms
      );

    // =====================
    // ML FALLBACK
    // =====================

    if (
  possibleDiseases.length === 0
) {

  if (
    symptoms.length < 2
  ) {

    console.timeEnd(
      "TOTAL_CHAT"
    );

    return res.json({

      success: true,

      message:
        "More information is needed for a reliable prediction.",

      enteredSymptoms:
        symptoms,

      analysis: {

        temporal:
          temporalData,

        severity:
          severityData,

        emergency:
          emergencyData

      },

      followUpQuestions: [

        "Can you describe any additional symptoms?",

        "Has the symptom worsened?",

        "Have you consulted a doctor already?"

      ],

      possibleDiseases: [],

      recommendedDoctors: []

    });

  }

  console.log(
    "RULE ENGINE FAILED - USING ML"
  );

  possibleDiseases =
    await mlPredictDisease(
      symptoms
    ) || [];

}

    // =====================
    // VALIDATION
    // =====================

    if (
      !Array.isArray(
        possibleDiseases
      )
    ) {

      console.timeEnd(
        "TOTAL_CHAT"
      );

      return res.status(500).json({

        success: false,

        message:
          "Invalid prediction response"

      });

    }

    console.log(
      "PREDICTIONS:",
      possibleDiseases
    );

    // =====================
    // TOP PREDICTION
    // =====================

    const topPrediction =

      possibleDiseases[0];

    // =====================
    // DOCTOR RECOMMENDATIONS
    // =====================

    let recommendedDoctors =
      [];

    if (
      topPrediction?.department
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

    // =====================
    // STORE CHAT
    // =====================

    messages.push({

      id:
        crypto.randomUUID(),

      role:
        "user",

      content:
        message,

      createdAt:
        new Date()

    });

    // =====================
    // RESPONSE
    // =====================

    console.timeEnd(
      "TOTAL_CHAT"
    );

return res.json({

  success: true,

  emergency:
    emergencyData.emergency,

  urgentFollowup:

    emergencyData.emergency ||

    severityData.level ===
      "high" ||

    (temporalData.durationDays || 0) >= 5,

  message:

    emergencyData.emergency

      ? emergencyData.action

      : "Analysis completed",

  enteredSymptoms:
    symptoms,

  analysis: {

    temporal:
      temporalData,

    severity:
      severityData,

    emergency:
      emergencyData

  },

  possibleDiseases,

  recommendedDoctors

});

  } catch (error) {

    console.error(
      "CHAT ERROR:",
      error
    );

    console.timeEnd(
      "TOTAL_CHAT"
    );

    return res.status(500).json({

      success: false,

      message:
        "Chat analysis failed"

    });

  }

};

// =========================
// GET CHAT HISTORY
// =========================

const getMessages =
async (req, res) => {

  return res.json(
    messages
  );

};

module.exports = {

  analyzeChat,

  getMessages

};