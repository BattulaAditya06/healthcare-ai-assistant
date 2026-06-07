
const crypto =
require("crypto");

const {
  processSymptoms
} = require(
  "../services/nlpProcessingService"
);

const predictionService =
require(
  "../services/predictionService"
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

  try {

    const {
      message = ""
    } = req.body;

    // =====================
    // NLP
    // =====================

    const processedData =

      processSymptoms(
        message
      );

    const symptoms =
      processedData.symptoms;

    console.log(
      "FINAL NORMALIZED SYMPTOMS:",
      symptoms
    );

    // =====================
    // PREDICTIONS
    // =====================

    const possibleDiseases =

      predictionService(
        symptoms
      ) || [];

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

    // =====================
    // STORE MESSAGE
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

    return res.json({

      success: true,

      enteredSymptoms:
        symptoms,

      possibleDiseases,

      recommendedDoctors

    });

  } catch (error) {

    console.log(error);

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