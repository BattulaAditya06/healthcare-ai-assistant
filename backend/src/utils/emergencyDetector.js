const emergencySymptoms =
require(
  "../datasets/emergencySymptoms.json"
);

const emergencyKeywords = [

  "severe chest pain",
  "cannot breathe",
  "difficulty breathing",
  "unconscious",
  "loss of consciousness",
  "stroke",
  "seizure"

];

const detectEmergency = (
  symptoms = [],
  text = ""
) => {

  const matchedEmergencySymptoms =

    symptoms.filter(
      symptom =>
        emergencySymptoms.includes(
          symptom
        )
    );

  const message =
    text.toLowerCase();

  const matchedKeywords =

    emergencyKeywords.filter(
      keyword =>
        message.includes(
          keyword
        )
    );

  return {

    emergency:

      matchedEmergencySymptoms.length > 0 ||

      matchedKeywords.length > 0,

    priority:

      matchedEmergencySymptoms.length > 0 ||

      matchedKeywords.length > 0

        ? "critical"

        : "normal",

    matchedSymptoms:
      matchedEmergencySymptoms,

    matchedKeywords,

    action:

      matchedEmergencySymptoms.length > 0 ||

      matchedKeywords.length > 0

        ? "Immediate medical attention required"

        : "Monitor symptoms"

  };

};

module.exports =
  detectEmergency;