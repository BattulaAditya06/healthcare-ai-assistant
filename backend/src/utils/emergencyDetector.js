const emergencyKeywords = [

  "stroke",

  "heart attack",

  "chest pain",

  "severe chest pain",

  "cannot breathe",

  "difficulty breathing",

  "shortness of breath",

  "loss of consciousness",

  "unconscious",

  "seizure"

];

const detectEmergency = (
  symptoms = [],
  text = ""
) => {

  const message =
    String(text).toLowerCase();

  const symptomText =
    symptoms.join(" ")
      .toLowerCase();

  const matchedKeywords =
    emergencyKeywords.filter(
      keyword => {

        const words =
          keyword.split(" ");

        return words.every(
          word =>
            message.includes(word)
        );

      }
    );

  const emergencySymptoms = [

    "chest pain",

    "difficulty breathing",

    "shortness of breath",

    "stroke",

    "seizure",

    "loss of consciousness"

  ];

  const symptomEmergency =

    emergencySymptoms.some(
      symptom =>

        symptomText.includes(
          symptom
        )
    );

  const emergency =

    matchedKeywords.length > 0 ||

    symptomEmergency;

  console.log(
    "EMERGENCY CHECK:",
    message
  );

  console.log(
    "MATCHED:",
    matchedKeywords
  );

  console.log(
    "SYMPTOM EMERGENCY:",
    symptomEmergency
  );

  return {

    emergency,

    priority:
      emergency
        ? "critical"
        : "normal",

    matchedSymptoms:

      emergencySymptoms.filter(
        symptom =>

          symptomText.includes(
            symptom
          )
      ),

    matchedKeywords,

    action:
      emergency
        ? "Immediate medical attention required"
        : "Monitor symptoms"

  };

};

const getEmergencyDepartment =
(symptoms = []) => {

  const text =
    symptoms.join(" ")
      .toLowerCase();

  if (
    text.includes("chest pain")
  ) {

    return "Cardiology";

  }

  if (
    text.includes("breathing") ||
    text.includes("shortness of breath")
  ) {

    return "Pulmonology";

  }

  if (
    text.includes("seizure") ||
    text.includes("stroke")
  ) {

    return "Neurology";

  }

  return "Emergency Medicine";

};

module.exports ={
  detectEmergency,
  getEmergencyDepartment
};