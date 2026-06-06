
const emergencySymptoms = [

  "chest pain",

  "difficulty breathing",

  "shortness of breath",

  "unconscious",

  "severe bleeding",

  "blood vomiting",

  "seizure"

];

const detectEmergency =
(symptoms = []) => {

  return symptoms.some(

    (symptom) =>

      emergencySymptoms.includes(
        symptom
      )

  );

};

module.exports =
  detectEmergency;
