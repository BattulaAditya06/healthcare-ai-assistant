
const recommendDoctors =
require(
  "../appointments/services/doctorRecommendationService"
);

// =========================
// CONTEXT OVERLAP CHECK
// =========================

const hasContextOverlap =
(
  existingSymptoms = [],
  newSymptoms = []
) => {

  return newSymptoms.some(

    (symptom) =>

      existingSymptoms.includes(
        symptom
      )

  );

};

const detectEmergency =
require(
  "../utils/emergencyDetector"
);

const prisma =
require("../config/prisma");

const extractSymptoms =
require(
  "../ml/preprocess/symptomExtractor"
);

const hybridPredictor =
require(
  "../ml/prediction/hybridPredictor"
);

const rankFollowUpQuestions =
require(
  "../ml/questionRankingEngine"
);

const {
  getOrCreateUserChat
} = require(
  "./userChatService"
);

// =========================
// NORMALIZE
// =========================

const normalize =
(value = "") =>

  value
    .toLowerCase()
    .trim();

// =========================
// UNIQUE ARRAY
// =========================

const uniqueArray =
(array = []) =>

  [...new Set(array)];

// =========================
// CHAT SERVICE
// =========================

const chatService =
async (
  userId,
  message
) => {

  try {

    console.log(
      "CHAT MESSAGE:",
      message
    );

    // =========================
    // GET CHAT
    // =========================

    const chat =
      await getOrCreateUserChat(
        userId
      );

    // =========================
    // SAVE USER MESSAGE
    // =========================

    await prisma.message.create({

      data: {

        chatId: chat.id,

        role: "user",

        type: "text",

        content: message

      }

    });

    const normalizedMessage =
      normalize(message);

    // =========================
    // GREETINGS
    // =========================

    const greetings = [

      "hi",

      "hello",

      "hey",

      "good morning",

      "good evening"

    ];

    if (

      greetings.includes(
        normalizedMessage
      )

    ) {

      const response = {

        success: true,

        message:
          "Hello! Please describe your symptoms so I can help analyze possible conditions.",

        enteredSymptoms: [],

        possibleDiseases: [],

        followUpQuestions: []

      };

      await prisma.message.create({

        data: {

          chatId: chat.id,

          role: "assistant",

          type: "text",

          content:
            JSON.stringify(
              response
            )

        }

      });

      return response;

    }

    // =========================
    // RESET CHAT
    // =========================

    if (

      normalizedMessage === "reset" ||

      normalizedMessage === "start over"

    ) {

      await prisma.chat.update({

        where: {
          id: chat.id
        },

        data: {

          currentSymptoms: [],

          negativeSymptoms: [],

          askedSymptoms: [],

          lastQuestion: null

        }

      });

      const resetResponse = {

        success: true,

        message:
          "Chat symptoms and analysis have been reset. Please describe your symptoms again.",

        enteredSymptoms: [],

        possibleDiseases: [],

        followUpQuestions: []

      };

      await prisma.message.create({

        data: {

          chatId: chat.id,

          role: "assistant",

          type: "text",

          content:
            JSON.stringify(
              resetResponse
            )

        }

      });

      return resetResponse;

    }

    // =========================
    // EXISTING STATE
    // =========================

    let currentSymptoms =
      chat.currentSymptoms || [];

    let negativeSymptoms =
      chat.negativeSymptoms || [];

    let askedSymptoms =
      chat.askedSymptoms || [];

    // =========================
    // YES RESPONSE
    // =========================

    if (

      normalizedMessage === "yes" &&

      chat.lastQuestion

    ) {

      const symptom =
        chat.lastQuestion

          .replace(
            "Do you also have ",
            ""
          )

          .replace("?", "")
          .trim();

      negativeSymptoms =
        negativeSymptoms.filter(

          (item) =>

            item !== symptom

        );

      currentSymptoms =
        uniqueArray([

          ...currentSymptoms,

          symptom

        ]);

    }

    // =========================
    // NO RESPONSE
    // =========================

    else if (

      normalizedMessage === "no" &&

      chat.lastQuestion

    ) {

      const symptom =
        chat.lastQuestion

          .replace(
            "Do you also have ",
            ""
          )

          .replace("?", "")
          .trim();

      currentSymptoms =
        currentSymptoms.filter(

          (item) =>

            item !== symptom

        );

      negativeSymptoms =
        uniqueArray([

          ...negativeSymptoms,

          symptom

        ]);

    }

    // =========================
    // NORMAL MESSAGE
    // =========================

    else {

      const {

        symptoms:
          extractedSymptoms,

        negativeSymptoms:
          extractedNegativeSymptoms

      } = extractSymptoms(
        message
      );

      console.log(
        "EXTRACTED:",
        extractedSymptoms
      );

      console.log(
        "NEGATIVE:",
        extractedNegativeSymptoms
      );

      // =====================
      // MERGE NEGATIVE
      // =====================

      negativeSymptoms =
        uniqueArray([

          ...negativeSymptoms,

          ...extractedNegativeSymptoms

        ]);

      // =====================
      // CONTEXT OVERLAP
      // =====================

      const overlap =
        hasContextOverlap(

          currentSymptoms,

          extractedSymptoms

        );

      // =====================
      // NEW CONTEXT
      // =====================

      if (

        currentSymptoms.length >= 2 &&

        extractedSymptoms.length > 0 &&

        !overlap

      ) {

        console.log(
          "NEW CONTEXT DETECTED"
        );

        currentSymptoms =
          extractedSymptoms;

        negativeSymptoms = [];

        askedSymptoms = [];

      }

      // =====================
      // SAME CONTEXT
      // =====================

      else {

        currentSymptoms =
          uniqueArray([

            ...currentSymptoms,

            ...extractedSymptoms

          ]);

      }

    }

    // =========================
    // NO SYMPTOMS
    // =========================

    if (
      currentSymptoms.length === 0
    ) {

      const response = {

        success: false,

        message:
          "I could not identify any medical symptoms. Please describe symptoms like fever, cough, headache, stomach pain, dizziness, etc.",

        enteredSymptoms: [],

        possibleDiseases: [],

        followUpQuestions: []

      };

      await prisma.message.create({

        data: {

          chatId: chat.id,

          role: "assistant",

          type: "text",

          content:
            JSON.stringify(
              response
            )

        }

      });

      return response;

    }

    // =========================
    // EMERGENCY CHECK
    // =========================

    const isEmergency =
      detectEmergency(
        currentSymptoms
      );

    if (isEmergency) {

      const emergencyResponse = {

        success: true,

        emergency: true,

        message:
          "Your symptoms may indicate a medical emergency. Please seek immediate medical attention immediately.",

        enteredSymptoms:
          currentSymptoms,

        possibleDiseases: [],

        followUpQuestions: []

      };

      await prisma.message.create({

        data: {

          chatId: chat.id,

          role: "assistant",

          type: "emergency",

          content:
            JSON.stringify(
              emergencyResponse
            )

        }

      });

      return emergencyResponse;

    }

    // =========================
    // PREDICTIONS
    // =========================

    const predictions =
      await hybridPredictor(

        currentSymptoms,

        negativeSymptoms

      );

    console.log(
      "PREDICTIONS:",
      predictions
    );

// =========================
// DOCTOR RECOMMENDATIONS
// =========================

const recommendedDoctors =

  recommendDoctors(

    predictions?.[0]
      ?.department

  ) || [];

console.log(
  "RECOMMENDED DOCTORS:",
  recommendedDoctors
);


    // =========================
    // FOLLOWUPS
    // =========================

    const followUpQuestions =
      rankFollowUpQuestions(

        predictions,

        currentSymptoms,

        negativeSymptoms,

        askedSymptoms

      );

    let followUpQuestion =
      null;

    if (

      followUpQuestions.length > 0

    ) {

      followUpQuestion =
        followUpQuestions[0];

    }

    // =========================
    // LOW CONFIDENCE
    // =========================

    const topPrediction =
      predictions[0];

    if (

      topPrediction &&

      topPrediction.confidence < 25 &&

      followUpQuestions.length === 0

    ) {

      const lowConfidenceResponse = {

        success: true,

        message:
          "The available symptoms are insufficient for a reliable prediction. Please provide additional symptoms.",

        enteredSymptoms:
          currentSymptoms,

        possibleDiseases:
          predictions,

        followUpQuestions

      };

      await prisma.message.create({

        data: {

          chatId: chat.id,

          role: "assistant",

          type: "text",

          content:
            JSON.stringify(
              lowConfidenceResponse
            )

        }

      });

      return lowConfidenceResponse;

    }

    // =========================
    // UPDATE ASKED
    // =========================

    if (
      followUpQuestion
    ) {

      const symptom =
        followUpQuestion

          .replace(
            "Do you also have ",
            ""
          )

          .replace("?", "")
          .trim();

      askedSymptoms =
        uniqueArray([

          ...askedSymptoms,

          symptom

        ]);

    }

    // =========================
    // SAVE CHAT STATE
    // =========================

    await prisma.chat.update({

      where: {
        id: chat.id
      },

      data: {

        currentSymptoms,

        negativeSymptoms,

        askedSymptoms,

        lastQuestion:
          followUpQuestion

      }

    });

    // =========================
    // FINAL RESPONSE
    // =========================

const response = {

  success: true,

  enteredSymptoms:
    currentSymptoms,

  possibleDiseases:
    predictions,

  followUpQuestions:
    followUpQuestions || [],

  recommendedDoctors

};


    // =========================
    // SAVE BOT MESSAGE
    // =========================

    await prisma.message.create({

      data: {

        chatId: chat.id,

        role: "assistant",

        type: "diagnosis",

        content:
          JSON.stringify(
            response
          )

      }

    });

    return response;

  } catch (error) {

    console.log(
      "CHAT SERVICE ERROR:",
      error
    );

    throw error;

  }

};

module.exports =
  chatService;
