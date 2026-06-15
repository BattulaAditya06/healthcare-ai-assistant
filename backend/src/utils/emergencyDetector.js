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
    String(text).toLowerCase();

  const matchedKeywords =

    emergencyKeywords.filter(
      keyword =>
        message.includes(keyword)
    );

console.log(
  "EMERGENCY CHECK:",
  message
);

console.log(
  "MATCHED:",
  matchedKeywords
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