const {
  extractSymptomsLocally
} = require(
  "../services/localNlpService"
);
const Session = require("../models/Session");
const { v4: uuidv4 } = require("uuid");
const normalizeSymptoms = require("../utils/normalizeSymptoms");
const symptomWeights = require("../utils/symptomWeights");
const followUpQuestions = require("../utils/followUpQuestions");
const Disease = require("../models/Disease");

const analyzeSymptoms = async (req, res) => {
  try {
   
let { symptoms, message, sessionId, removeSymptoms } = req.body;

let severity = "normal";

let temporalStatus =
  "active";

if (
  message &&
  typeof message === "string"
) {

  const nlpResult =
  extractSymptomsLocally(
    message
  );

symptoms =
  nlpResult.symptoms;

severity =
  nlpResult.severity;

temporalStatus =
  nlpResult.temporalStatus;

console.log(nlpResult); 

}

if (
  temporalStatus === "resolved" ||
  temporalStatus === "past"
) {

  symptoms = [];
}


    // Validate BEFORE normalization
    
    if (
  (!symptoms || symptoms.length === 0) &&
  (!removeSymptoms || removeSymptoms.length === 0)
){

  return res.status(200).json({
    success: true,

    message:
      "Symptoms appear related to temporary lifestyle, stress, workout, travel, or non-medical conditions.",

    enteredSymptoms: [],

    possibleDiseases: []
  });
}

symptoms = symptoms || [];
removeSymptoms = removeSymptoms || [];

// Prevent both arrays empty
if (
  symptoms.length === 0 &&
  removeSymptoms.length === 0
) {
  return res.status(400).json({
    success: false,
    message: "Please provide symptoms"
  });
}

    // Normalize symptoms
    symptoms = normalizeSymptoms(symptoms);
let session;

// Existing session
if (sessionId) {

  session = await Session.findOne({ sessionId });

  if (!session) {
    return res.status(404).json({
      success: false,
      message: "Session not found"
    });
  }

  // Merge old + new symptoms
  symptoms = [
  ...new Set([
    ...session.symptoms,
    ...symptoms
  ])
];

// Remove symptoms if provided
if (
  removeSymptoms &&
  Array.isArray(removeSymptoms)
) {

  symptoms = symptoms.filter(
    (symptom) =>
      !removeSymptoms.includes(symptom)
  );

}

} else {

  // Create new session
  sessionId = uuidv4();

  session = new Session({
    sessionId,
    symptoms: [],
    chatHistory: []
  });
}

// -----------------------------
    // Follow-up Questions
    // -----------------------------

    let questions = [];

    symptoms.forEach((symptom) => {
      if (followUpQuestions[symptom]) {
        questions.push(...followUpQuestions[symptom]);
      }
    });

    // Remove duplicate questions
    questions = [...new Set(questions)];
    session.chatHistory.push({
  sender: "user",

  message:
  symptoms.length > 0
    ? `Symptoms: ${symptoms.join(", ")}`
    : `Removed symptoms: ${removeSymptoms.join(", ")}`
});

    const diseases = await Disease.find();

    // -----------------------------
    // Emergency Severity Scoring
    // -----------------------------

    let emergencyScore = 0;

if (
  severity === "severe"
) {

  emergencyScore += 3;
}

if (
  severity === "moderate"
) {

  emergencyScore += 1;
}

    symptoms.forEach((symptom) => {
      if (symptom === "chest pain") {
        emergencyScore += 5;
      }

      if (symptom === "breathing difficulty") {
        emergencyScore += 4;
      }

      if (symptom === "unconsciousness") {
        emergencyScore += 10;
      }

      if (symptom === "seizure") {
        emergencyScore += 8;
      }
    });

    let emergencyMessage = null;

    if (emergencyScore >= 8) {
      emergencyMessage =
        "Critical condition. Seek immediate medical attention.";
    } else if (emergencyScore >= 4) {
      emergencyMessage =
        "Symptoms may require urgent medical consultation.";
    }

    
    // -----------------------------
    // Disease Matching
    // -----------------------------

    const results = [];

    diseases.forEach((disease) => {
      const matchedSymptoms = disease.symptoms.filter((symptom) =>
        symptoms.includes(symptom)
      );

      let matchedWeight = 0;

      let totalWeight = 0;

      disease.symptoms.forEach((symptom) => {
        totalWeight += symptomWeights[symptom] || 1;

        if (symptoms.includes(symptom)) {
          matchedWeight += symptomWeights[symptom] || 1;
        }
      });

      const extraSymptoms = symptoms.filter(
  (symptom) => !disease.symptoms.includes(symptom)
);

const penalty = extraSymptoms.length * 10;

const matchPercentage = Math.max(
  0,
  Math.round(
    ((matchedWeight / totalWeight) * 100) - penalty
  )
);

let finalScore = matchPercentage;

// Critical symptom adjustment
if (disease.criticalSymptoms) {

  disease.criticalSymptoms.forEach((symptom) => {

    if (symptoms.includes(symptom)) {

      // reward matched critical symptoms
      finalScore += 10;

    } else {

      // penalize missing critical symptoms
      finalScore -= 8;

    }

  });

}

// Keep score between 0 and 100
finalScore = Math.max(
  0,
  Math.min(finalScore, 100)
);



      // Filter weak matches
      // Filter weak matches
if (
  finalScore >= 45 &&
  matchedSymptoms.length >= 2
) {
        results.push({
          disease: disease.name,

          matchedSymptoms,

          matchPercentage: finalScore,

          confidence:
  finalScore >= 80
    ? "High"
    : finalScore >= 50
    ? "Medium"
    : "Low",

          riskLevel: disease.riskLevel,

          department: disease.department,

          recommendations: disease.recommendations
        });
      }
    });

    // Sort highest confidence first
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

if (results.length === 0) {

  return res.status(200).json({
    success: true,
    sessionId,

    emergency: emergencyMessage,

    enteredSymptoms: symptoms,

    followUpQuestions: questions,

    message:
      "Symptoms are insufficient for accurate prediction. Please provide more details.",

    possibleDiseases: []
  });
}

    // -----------------------------
    // Final Response
    // -----------------------------
session.symptoms = symptoms;

session.chatHistory.push({
  sender: "bot",

  message:
    results.length > 0
      ? `Possible diseases: ${results
          .map((d) => d.disease)
          .join(", ")}`
      : "No matching diseases found"
});

await session.save();

    res.status(200).json({
      success: true,
sessionId,
      emergency: emergencyMessage,

      enteredSymptoms: symptoms,

      followUpQuestions: questions,

      possibleDiseases: results
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  analyzeSymptoms
};