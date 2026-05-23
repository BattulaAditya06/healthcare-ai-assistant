const Session =
require("../models/Session");

const { v4: uuidv4 } =
require("uuid");

const handleSession = async (
  sessionId,
  symptoms,
  removeSymptoms
) => {

  let session;

  symptoms = symptoms || [];
  removeSymptoms =
    removeSymptoms || [];

  if (sessionId) {

    session =
      await Session.findOne({
        sessionId
      });

    if (!session) {

      throw new Error(
        "Session not found"
      );

    }

    symptoms = [
      ...new Set([
        ...session.symptoms,
        ...symptoms
      ])
    ];

    if (
      removeSymptoms &&
      Array.isArray(
        removeSymptoms
      )
    ) {

      symptoms = symptoms.filter(
        (symptom) =>
          !removeSymptoms.includes(
            symptom
          )
      );

    }

  } else {

    sessionId = uuidv4();

    session = new Session({

      sessionId,

      symptoms: [],

      chatHistory: []

    });

  }

  session.symptoms = symptoms;

  session.chatHistory.push({

    sender: "user",

    message:
      symptoms.length > 0
        ? `Symptoms: ${symptoms.join(", ")}`
        : `Removed symptoms: ${removeSymptoms.join(", ")}`

  });

  await session.save();

  return session;
};

module.exports = {
  handleSession
};