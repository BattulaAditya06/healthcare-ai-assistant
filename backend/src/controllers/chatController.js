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

    console.log(
      "CHAT MESSAGE:",
      message
    );



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
  emergencyDetector(
    symptoms,
    message
  );

if (
  emergencyData.emergency
) {

  console.warn(
    "EMERGENCY DETECTED:",
    emergencyData
  );

}

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

        enteredSymptoms:
          [],

        possibleDiseases:
          [],

        recommendedDoctors:
          []

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