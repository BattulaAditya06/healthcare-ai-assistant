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

const detectEmergency =
(symptoms = []) => {

  const matchedEmergencySymptoms =
    symptoms.filter(
      (symptom) =>

        emergencySymptoms.includes(
          symptom
        )
    );


    
  return {

    isEmergency:

      matchedEmergencySymptoms
        .length > 0,

    matchedSymptoms:
      matchedEmergencySymptoms

  };

};


const detectEmergency =
(text = "") => {

  const message =
    text.toLowerCase();

  for (
    const keyword
    of emergencyKeywords
  ) {

    if (
      message.includes(
        keyword
      )
    ) {

      return {

        emergency: true,

        priority:
          "critical",

        action:
          "Immediate medical attention required"

      };

    }

  }

  return {

    emergency: false,

    priority:
      "normal"

  };

};

module.exports =
detectEmergency;