const temporalAnalyzer =
  require("../utils/temporalAnalyzer");

const followUpQuestions =
  require("../utils/followUpQuestions");

const severityAnalyzer =
  require("../utils/severityAnalyzer");

const {
  detectEmergency,
  getEmergencyDepartment
} = require("../utils/emergencyDetector");

const {
  processSymptoms
} = require("../services/nlpProcessingService");

const predictionService =
  require("../services/predictionService");

const {
  predictDisease: mlPredictDisease
} = require("../services/mlService");

const recommendDoctors =
  require(
    "../appointments/services/doctorRecommendationService"
  );

const {
  getOrCreateUserChat
} = require("../services/userChatService");
const prisma =
  require("../config/prisma");

const {
  saveMessage
} = require("../services/chatPersistenceService");

console.log(
  "MIGRAINE QUESTIONS LOADED:",
  followUpQuestions.migraine
);


// ======================================================
// UTILITY FUNCTIONS
// ======================================================

// Remove duplicate values from an array
const uniqueArray =
  (array = []) =>
    [...new Set(array)];


// Check whether the new symptoms belong to
// the existing conversation context
const hasContextOverlap =
  (
    existingSymptoms = [],
    newSymptoms = []
  ) => {

    return newSymptoms.some(
      (symptom) =>
        existingSymptoms.includes(symptom)
    );

  };

  const isContextContinuation =
  (message = "") => {

    const continuationPatterns = [
      "also have",
      "also having",
      "and i have",
      "i have also",
      "along with",
      "plus",
      "additionally",
      "as well as",
      "and also"
    ];

    const normalized =
      message
        .toLowerCase()
        .trim();

    return continuationPatterns.some(
      (pattern) =>
        normalized.includes(pattern)
    );

  };

// ======================================================
// ANALYZE CHAT
// ======================================================

const analyzeChat =
  async (req, res) => {

    console.time(
      "TOTAL_CHAT"
    );

    try {

      // ==================================================
      // AUTHENTICATED USER
      // ==================================================

      const userId =
        req.user?.id;

      if (!userId) {

        console.timeEnd(
          "TOTAL_CHAT"
        );

        return res.status(401).json({

          success: false,

          message:
            "Unauthorized"

        });

      }


      // ==================================================
      // REQUEST BODY
      // ==================================================

      const {
        message = ""
      } = req.body;


      const cleanMessage =
        String(message).trim();


      if (!cleanMessage) {

        console.timeEnd(
          "TOTAL_CHAT"
        );

        return res.status(400).json({

          success: false,

          message:
            "Message is required"

        });

      }


      console.log(
        "================================"
      );

      console.log(
        "USER ID:",
        userId
      );

      console.log(
        "USER MESSAGE:",
        cleanMessage
      );

      console.log(
        "================================"
      );


      // ==================================================
      // GET OR CREATE PRISMA CHAT
      // ==================================================

      const chat =
        await getOrCreateUserChat(
          userId
        );

        // =========================
// RESET CHAT CONTEXT
// =========================
if (cleanMessage.toLowerCase() === "reset") {
  await prisma.chat.update({
    where: { id: chat.id },
    data: {
      currentSymptoms: [],
      negativeSymptoms: [],
      askedSymptoms: [],
      lastQuestion: null
    }
  });

  const response = {
    success: true,
    chatId: chat.id,
    sessionId: chat.id,
    emergency: false,
    message: "Chat context has been reset. Please describe your symptoms.",
    enteredSymptoms: [],
    activeSymptoms: [],
    analysis: {
      temporal: null,
      severity: null,
      emergency: false
    },
    possibleDiseases: [],
    followUpQuestions: [],
    recommendedDoctors: []
  };

  await saveMessage({
  chatId: chat.id,
  role: "assistant",
  type: "text",
  content: JSON.stringify(response)
});

console.timeEnd("TOTAL_CHAT");

return res.json(response);
}


      console.log(
        "CHAT ID:",
        chat.id
      );


      // ==================================================
      // SAVE USER MESSAGE
      // ==================================================

      await prisma.message.create({

        data: {

          chatId:
            chat.id,

          role:
            "user",

          type:
            "text",

          content:
            cleanMessage

        }

      });


      // ==================================================
      // NLP PROCESSING
      // ==================================================

      const processedData =
        processSymptoms(
          cleanMessage
        );


      const symptoms =
        processedData?.symptoms || [];


      console.log(
        "CURRENT MESSAGE SYMPTOMS:",
        symptoms
      );


      // ==================================================
      // EXISTING PRISMA CHAT STATE
      // ==================================================

      let currentSymptoms =
        Array.isArray(
          chat.currentSymptoms
        )
          ? chat.currentSymptoms
          : [];


      let negativeSymptoms =
        Array.isArray(
          chat.negativeSymptoms
        )
          ? chat.negativeSymptoms
          : [];


      let askedSymptoms =
        Array.isArray(
          chat.askedSymptoms
        )
          ? chat.askedSymptoms
          : [];


      console.log(
        "EXISTING CHAT SYMPTOMS:",
        currentSymptoms
      );

      console.log(
        "EXISTING NEGATIVE SYMPTOMS:",
        negativeSymptoms
      );

      console.log(
        "EXISTING ASKED SYMPTOMS:",
        askedSymptoms
      );


      // ==================================================
      // UPDATE CHAT CONTEXT
      // ==================================================

      if (symptoms.length > 0) {

        const overlap =
          hasContextOverlap(
            currentSymptoms,
            symptoms
          );


        // ----------------------------------------------
        // NEW UNRELATED CONTEXT
        // ----------------------------------------------

        if (

          currentSymptoms.length >0 &&

          symptoms.length > 0 &&

          !overlap &&
          !isContextContinuation(cleanMessage)

        ) {

          console.log(
            "NEW CONTEXT DETECTED"
          );

          console.log(
            "OLD CONTEXT:",
            currentSymptoms
          );

          console.log(
            "NEW CONTEXT:",
            symptoms
          );


          currentSymptoms =
            uniqueArray(
              symptoms
            );

          negativeSymptoms =
            [];

          askedSymptoms =
            [];

        }


        // ----------------------------------------------
        // SAME / RELATED CONTEXT
        // ----------------------------------------------

        else {

          currentSymptoms =
            uniqueArray([

              ...currentSymptoms,

              ...symptoms

            ]);

        }

      }


      // ==================================================
      // ACTIVE SYMPTOMS
      // ==================================================

      const activeSymptoms =
        uniqueArray(
          currentSymptoms
        );


      console.log(
        "CURRENT MESSAGE SYMPTOMS:",
        symptoms
      );

      console.log(
        "ACTIVE CHAT SYMPTOMS:",
        activeSymptoms
      );


      // ==================================================
      // TEMPORAL ANALYSIS
      // ==================================================

      const temporalData =
        temporalAnalyzer(
          cleanMessage
        );


      // ==================================================
      // SEVERITY ANALYSIS
      // ==================================================

      const severityData =
        severityAnalyzer(
          cleanMessage
        );


      // ==================================================
      // EMERGENCY ANALYSIS
      // IMPORTANT:
      // Emergency is based on the CURRENT message,
      // not old session symptoms.
      // ==================================================

      const emergencyData =
        detectEmergency(
          symptoms,
          cleanMessage
        );


      const emergencyDepartment =
        getEmergencyDepartment(
          symptoms
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
        "EMERGENCY DATA:",
        emergencyData
      );


      // ==================================================
      // EMPTY CURRENT MESSAGE SYMPTOMS
      // ==================================================

      if (
        symptoms.length === 0
      ) {

        // Save existing context state
        await prisma.chat.update({

          where: {
            id:
              chat.id
          },

          data: {

            currentSymptoms:
              activeSymptoms,

            negativeSymptoms,

            askedSymptoms,

            lastQuestion:
              null

          }

        });


        const response = {

          success: true,

          chatId:
            chat.id,

          // Compatibility with the old frontend
          sessionId:
            chat.id,

          message:
            "No symptoms detected. Please describe your symptoms.",

          enteredSymptoms: [],

          activeSymptoms,

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

        };


        await prisma.message.create({

          data: {

            chatId:
              chat.id,

            role:
              "assistant",

            type:
              "text",

            content:
              JSON.stringify(
                response
              )

          }

        });


        console.timeEnd(
          "TOTAL_CHAT"
        );


        return res.json(
          response
        );

      }


      // ==================================================
      // EMERGENCY SHORT-CIRCUIT
      // ==================================================

      if (
        emergencyData.emergency
      ) {

        console.log(
          "================================"
        );

        console.log(
          "EMERGENCY DETECTED"
        );

        console.log(
          "SKIPPING NORMAL PREDICTION"
        );

        console.log(
          "================================"
        );


        // Persist context before returning
        await prisma.chat.update({

          where: {
            id:
              chat.id
          },

          data: {

            currentSymptoms:
              activeSymptoms,

            negativeSymptoms,

            askedSymptoms,

            lastQuestion:
              null

          }

        });


        const emergencyResponse = {

          success: true,

          chatId:
            chat.id,

          // Compatibility field
          sessionId:
            chat.id,

          emergency:
            true,

          emergencyDepartment:
            emergencyDepartment ||
            "Emergency Care",

          urgentFollowup:
            true,

          message:
            emergencyData.action ||
            "Immediate medical attention required",

          enteredSymptoms:
            symptoms,

          activeSymptoms,

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

        };


        await prisma.message.create({

          data: {

            chatId:
              chat.id,

            role:
              "assistant",

            type:
              "emergency",

            content:
              JSON.stringify(
                emergencyResponse
              )

          }

        });


        console.timeEnd(
          "TOTAL_CHAT"
        );


        return res.json(
          emergencyResponse
        );

      }


      // ==================================================
      // SINGLE-SYMPTOM / INSUFFICIENT CONTEXT CHECK
      // ==================================================

      const allowSingleSymptomPrediction =

        (temporalData?.durationDays || 0) >= 3 ||

        severityData?.level === "high";


      const hasMeaningfulContext =
        allowSingleSymptomPrediction;


      /*
       * IMPORTANT:
       *
       * We use ACTIVE symptoms here.
       *
       * Example:
       *
       * Message 1:
       * "I have migraine"
       *
       * Message 2:
       * "I also have nausea"
       *
       * Current message:
       * ["nausea"]
       *
       * Active context:
       * ["migraine", "nausea"]
       *
       * Therefore the second message can continue
       * the existing conversation.
       */

      if (

        activeSymptoms.length < 2 &&

        !allowSingleSymptomPrediction

      ) {

        const followUpSet =
          new Set();


        console.log(
          "FOLLOW-UP LOOKUP START"
        );


        for (
          const symptom
          of activeSymptoms
        ) {

          console.log(
            "Checking symptom:",
            symptom
          );


          console.log(
            "Questions found:",
            followUpQuestions[symptom]
          );


          if (
            followUpQuestions[symptom]
          ) {

            followUpQuestions[symptom]
              .forEach(
                (question) => {

                  followUpSet.add(
                    question
                  );

                }
              );

          }

        }


        let followUp =
          Array.from(
            followUpSet
          );


        followUp =
          followUp.slice(
            0,
            6
          );


        // Default questions
        if (
          followUp.length === 0
        ) {

          followUp = [

            "Can you describe any additional symptoms?",

            "How long have you had this symptom?",

            "Has it become worse?"

          ];

        }


        // ==================================================
        // SAVE CHAT STATE
        // ==================================================

        const lastQuestion =
          followUp[0] ||
          null;


        await prisma.chat.update({

          where: {
            id:
              chat.id
          },

          data: {

            currentSymptoms:
              activeSymptoms,

            negativeSymptoms,

            askedSymptoms,

            lastQuestion

          }

        });


        const insufficientResponse = {

          success: true,

          chatId:
            chat.id,

          // Compatibility field
          sessionId:
            chat.id,

          message:
            "More information is needed for a reliable prediction.",

          urgentFollowup:
            hasMeaningfulContext,

          enteredSymptoms:
            symptoms,

          activeSymptoms,

          analysis: {

            temporal:
              temporalData,

            severity:
              severityData,

            emergency:
              emergencyData

          },

          followUpQuestions:
            followUp,

          possibleDiseases: [],

          recommendedDoctors: []

        };


        await prisma.message.create({

          data: {

            chatId:
              chat.id,

            role:
              "assistant",

            type:
              "followup",

            content:
              JSON.stringify(
                insufficientResponse
              )

          }

        });


        console.timeEnd(
          "TOTAL_CHAT"
        );


        return res.json(
          insufficientResponse
        );

      }


      // ==================================================
      // PREDICTION
      // ==================================================

      console.log(
        "================================"
      );

      console.log(
        "BEFORE PREDICTION"
      );

      console.log(
        "ACTIVE SYMPTOMS:",
        activeSymptoms
      );

      console.log(
        "================================"
      );


      let possibleDiseases =
        predictionService(
          activeSymptoms
        );


      // ==================================================
      // ML FALLBACK
      // ==================================================

      if (
        possibleDiseases.length === 0
      ) {

        /*
         * If there are still too few symptoms,
         * don't unnecessarily call the external ML service.
         */

        if (

          activeSymptoms.length <2 &&

          !emergencyData.emergency

        ) {

          const followUp = [

            "Can you describe any additional symptoms?",

            "Has the symptom worsened?",

            "Have you consulted a doctor already?"

          ];


          await prisma.chat.update({

            where: {
              id:
                chat.id
            },

            data: {

              currentSymptoms:
                activeSymptoms,

              negativeSymptoms,

              askedSymptoms,

              lastQuestion:
                followUp[0]

            }

          });


          const mlInsufficientResponse = {

            success: true,

            chatId:
              chat.id,

            // Compatibility field
            sessionId:
              chat.id,

            message:
              "More information is needed for a reliable prediction.",

            enteredSymptoms:
              symptoms,

            activeSymptoms,

            analysis: {

              temporal:
                temporalData,

              severity:
                severityData,

              emergency:
                emergencyData

            },

            followUpQuestions:
              followUp,

            possibleDiseases: [],

            recommendedDoctors: []

          };


          await prisma.message.create({

            data: {

              chatId:
                chat.id,

              role:
                "assistant",

              type:
                "followup",

              content:
                JSON.stringify(
                  mlInsufficientResponse
                )

            }

          });


          console.timeEnd(
            "TOTAL_CHAT"
          );


          return res.json(
            mlInsufficientResponse
          );

        }


        console.log(
          "RULE ENGINE FAILED - USING ML"
        );


        possibleDiseases =
          await mlPredictDisease(
            activeSymptoms
          ) || [];

      }


      // ==================================================
      // VALIDATION
      // ==================================================

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


      // ==================================================
      // TOP PREDICTION
      // ==================================================

      const topPrediction =
        possibleDiseases[0];


      // ==================================================
      // DOCTOR RECOMMENDATIONS
      // ==================================================

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


      // ==================================================
      // FOLLOW-UP QUESTIONS
      // ==================================================

      const followUpSet =
        new Set();


      for (
        const symptom
        of activeSymptoms
      ) {

        if (
          followUpQuestions[symptom]
        ) {

          followUpQuestions[symptom]
            .forEach(
              (question) => {

                followUpSet.add(
                  question
                );

              }
            );

        }

      }


      let followUp =
        Array.from(
          followUpSet
        );


      // Don't show too many questions
      followUp =
        followUp.slice(
          0,
          6
        );


      // ==================================================
      // UPDATE ASKED SYMPTOMS
      // ==================================================

      if (
        followUp.length > 0
      ) {

        const newAskedSymptoms =
          followUp.map(
            (question) =>
              question
                .replace(
                  "Do you also have ",
                  ""
                )
                .replace(
                  "?",
                  ""
                )
                .trim()
        );


        askedSymptoms =
          uniqueArray([

            ...askedSymptoms,

            ...newAskedSymptoms

          ]);

      }


      // ==================================================
      // SAVE CHAT STATE
      // ==================================================

      await prisma.chat.update({

        where: {
          id:
            chat.id
        },

        data: {

          currentSymptoms:
            activeSymptoms,

          negativeSymptoms,

          askedSymptoms,

          lastQuestion:
            followUp[0] ||
            null

        }

      });


      // ==================================================
      // FINAL RESPONSE
      // ==================================================

      const response = {

        success: true,

        chatId:
          chat.id,

        // Compatibility with old frontend
        sessionId:
          chat.id,

        emergency:
          emergencyData.emergency,

        emergencyDepartment:
          emergencyDepartment,

        urgentFollowup:

          emergencyData.emergency ||

          severityData.level === "high" ||

          (temporalData.durationDays || 0) >= 5,

        message:

          emergencyData.emergency

            ? emergencyData.action

            : "Analysis completed",

        /*
         * IMPORTANT:
         *
         * enteredSymptoms = symptoms from
         * the CURRENT message only.
         */

        enteredSymptoms:
          symptoms,

        /*
         * activeSymptoms = complete
         * persisted conversation context.
         */

        activeSymptoms,

        analysis: {

          temporal:
            temporalData,

          severity:
            severityData,

          emergency:
            emergencyData

        },

        possibleDiseases,

        followUpQuestions:
          followUp,

        recommendedDoctors

      };


      // ==================================================
      // SAVE ASSISTANT MESSAGE
      // ==================================================

      await prisma.message.create({

        data: {

          chatId:
            chat.id,

          role:
            "assistant",

          type:
            "diagnosis",

          content:
            JSON.stringify(
              response
            )

        }

      });


      console.timeEnd(
        "TOTAL_CHAT"
      );


      return res.json(
        response
      );


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


// ======================================================
// GET CHAT HISTORY
// ======================================================

const getMessages =
  async (req, res) => {

    try {

      const userId =
        req.user?.id;


      if (!userId) {

        return res.status(401).json({

          success: false,

          message:
            "Unauthorized"

        });

      }


      // Get the user's latest chat
      const chat =
        await prisma.chat.findFirst({

          where: {

            userId

          },

          orderBy: {

            createdAt:
              "desc"

          }

        });


      if (!chat) {

        return res.json([]);

      }


      const chatMessages =
        await prisma.message.findMany({

          where: {

            chatId:
              chat.id

          },

          orderBy: {

            createdAt:
              "asc"

          }

        });


      return res.json(
        chatMessages
      );


    } catch (error) {

      console.error(
        "GET CHAT HISTORY ERROR:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to retrieve chat history"

      });

    }

  };


// ======================================================
// EXPORT
// ======================================================

module.exports = {

  analyzeChat,

  getMessages

};