
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

    console.log(
      "USER ID:",
      userId
    );

    // GET OR CREATE CHAT
    const chat =
      await getOrCreateUserChat(
        userId
      );

    console.log(
      "CHAT:",
      chat?.id
    );

    // SAVE USER MESSAGE
    await prisma.message.create({

      data: {

        chatId: chat.id,

        role: "user",

        type: "text",

        content: message

      }

    });

    // NORMALIZED MESSAGE
    const normalizedMessage =
      message
        .toLowerCase()
        .trim();

    // GREETINGS
    const greetings = [

      "hi",

      "hello",

      "hey",

      "good morning",

      "good evening"

    ];

    // GREETING RESPONSE
    if (

      greetings.includes(
        normalizedMessage
      )

    ) {

      const greetingResponse = {

        success: true,

        message:
          "Hello! Please describe your symptoms so I can help analyze possible conditions.",

        enteredSymptoms: [],

        possibleDiseases: [],

        followUpQuestions: []

      };

      // SAVE BOT MESSAGE
      await prisma.message.create({

        data: {

          chatId: chat.id,

          role: "assistant",

          type: "text",

          content:
            JSON.stringify(
              greetingResponse
            )

        }

      });

      return greetingResponse;

    }

    // EXISTING STATE
    let currentSymptoms =
      chat.currentSymptoms || [];

    let negativeSymptoms =
      chat.negativeSymptoms || [];

    let askedSymptoms =
      chat.askedSymptoms || [];

    console.log(
      "CURRENT SYMPTOMS:",
      currentSymptoms
    );

    console.log(
      "NEGATIVE SYMPTOMS:",
      negativeSymptoms
    );

    console.log(
      "ASKED SYMPTOMS:",
      askedSymptoms
    );

    // HANDLE YES
    if (

      normalizedMessage ===
        "yes" &&

      chat.lastQuestion

    ) {

      const symptom =
        chat.lastQuestion

          .replace(
            "Do you also have ",
            ""
          )

          .replace(
            "?",
            ""
          )

          .trim();

      if (
        !currentSymptoms.includes(
          symptom
        )
      ) {

        currentSymptoms.push(
          symptom
        );

      }

    }

    // HANDLE NO
    else if (

      normalizedMessage ===
        "no" &&

      chat.lastQuestion

    ) {

      const symptom =
        chat.lastQuestion

          .replace(
            "Do you also have ",
            ""
          )

          .replace(
            "?",
            ""
          )

          .trim();

      if (
        !negativeSymptoms.includes(
          symptom
        )
      ) {

        negativeSymptoms.push(
          symptom
        );

      }

    }

    // NORMAL MESSAGE
    else {

      const extractedSymptoms =
        extractSymptoms(
          message
        );

      console.log(
        "EXTRACTED:",
        extractedSymptoms
      );

      currentSymptoms = [

        ...new Set([

          ...currentSymptoms,

          ...extractedSymptoms

        ])

      ];

    }

    console.log(
      "UPDATED SYMPTOMS:",
      currentSymptoms
    );

    // NO VALID SYMPTOMS
    if (
      currentSymptoms.length === 0
    ) {

      const noSymptomsResponse = {

        success: false,

        message:
          "I could not identify any medical symptoms. Please describe symptoms like fever, cough, headache, stomach pain, dizziness, etc.",

        enteredSymptoms: [],

        possibleDiseases: [],

        followUpQuestions: []

      };

      // SAVE BOT MESSAGE
      await prisma.message.create({

        data: {

          chatId: chat.id,

          role: "assistant",

          type: "text",

          content:
            JSON.stringify(
              noSymptomsResponse
            )

        }

      });

      return noSymptomsResponse;

    }

    console.log(
      "RUNNING PREDICTION"
    );

    // PREDICTION
    const predictions =
      await hybridPredictor(
        currentSymptoms
      );

    console.log(
      "PREDICTIONS:",
      predictions
    );

    // FOLLOWUPS
    const followUpQuestions =
      rankFollowUpQuestions(

        predictions,

        currentSymptoms,

        negativeSymptoms,

        askedSymptoms

      );

    console.log(
      "FOLLOWUPS:",
      followUpQuestions
    );

    let followUpQuestion =
      null;

    if (

      followUpQuestions &&

      followUpQuestions.length

    ) {

      followUpQuestion =
        followUpQuestions[0];

    }

    // UPDATE ASKED
    const updatedAskedSymptoms = [

      ...askedSymptoms

    ];

    if (
      followUpQuestion
    ) {

      const symptom =
        followUpQuestion

          .replace(
            "Do you also have ",
            ""
          )

          .replace(
            "?",
            ""
          )

          .trim();

      if (

        !updatedAskedSymptoms.includes(
          symptom
        )

      ) {

        updatedAskedSymptoms.push(
          symptom
        );

      }

    }

    console.log(
      "UPDATED ASKED:",
      updatedAskedSymptoms
    );

    // UPDATE CHAT MEMORY
    await prisma.chat.update({

      where: {
        id: chat.id
      },

      data: {

        currentSymptoms,

        negativeSymptoms,

        askedSymptoms:
          updatedAskedSymptoms,

        lastQuestion:
          followUpQuestion

      }

    });

    // FINAL RESPONSE
    const response = {

      success: true,

      enteredSymptoms:
        currentSymptoms,

      possibleDiseases:
        predictions,

      followUpQuestions:
        followUpQuestions || []

    };

    console.log(
      "FINAL RESPONSE:",
      response
    );

    // SAVE BOT MESSAGE
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