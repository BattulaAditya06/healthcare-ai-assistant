const emergencyKeywords = [

  "stroke",
  "stroke symptoms",
  "heart attack",
  "severe chest pain",
  "cannot breathe",
  "difficulty breathing",
  "loss of consciousness",
  "unconscious",
  "seizure"

];

const detectEmergency = (
  text = ""
) => {

  const message =
    text.toLowerCase();

  const matchedKeywords =

    emergencyKeywords.filter(
      keyword =>
        message.includes(keyword)
    );

  return {

    emergency:
      matchedKeywords.length > 0,

    priority:
      matchedKeywords.length > 0
        ? "critical"
        : "normal",

    matchedSymptoms: [],

    matchedKeywords,

    action:
      matchedKeywords.length > 0
        ? "Immediate medical attention required"
        : "Monitor symptoms"

  };

};

module.exports =
  detectEmergency;