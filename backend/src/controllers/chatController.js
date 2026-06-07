
const crypto =
require("crypto");

const {
  processSymptoms
} = require(
  "../services/nlpProcessingService"
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

    console.log(
  "BEFORE ML CALL"
);

const possibleDiseases =
  await predictDisease(
    symptoms
  ) || [];
if (!Array.isArray(possibleDiseases)) {

  console.log(
    "INVALID ML RESPONSE"
  );

  return res.status(500).json({

    success: false,
    message: "Invalid ML response"

  });

}
console.log(
  "AFTER ML CALL"
);

console.log(
  "ML PREDICTIONS:",
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