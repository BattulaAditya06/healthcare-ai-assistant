const {
  immediateEmergency,
  followUpSymptoms
} = require("../utils/triageConfig");

function runTriage(symptoms = []) {
  console.log(
  "NORMALIZED:",
  normalizedSymptoms
);

console.log(
  "FOLLOWUP KEYS:",
  Object.keys(followUpSymptoms)
);
for (const symptom of normalizedSymptoms) {

  console.log(
    "CHECKING:",
    symptom
  );

  if (followUpSymptoms[symptom]) {

    console.log(
      "FOUND FOLLOWUP:",
      symptom
    );

    return {

      type: "followup",

      matched: symptom,

      followUpQuestions:
        followUpSymptoms[symptom].questions,

      minimumAnswers:
        followUpSymptoms[symptom].minimumAnswers

    };

  }

}
  const normalizedSymptoms =

    symptoms.map(

      symptom =>
        symptom.toLowerCase().trim()

    );

  // =====================
  // IMMEDIATE EMERGENCY
  // =====================

  const emergencyMatch =

    immediateEmergency.symptoms.find(

      emergencySymptom =>

        normalizedSymptoms.includes(
          emergencySymptom
        )

    );

  if (emergencyMatch) {

    return {

      type: "emergency",

      matched: emergencyMatch,

      followUpQuestions: []

    };

  }

  // =====================
  // FOLLOW-UP SYMPTOMS
  // =====================

  for (const symptom of normalizedSymptoms) {

    if (

      followUpSymptoms[symptom]

    ) {

      return {

        type: "followup",

        matched: symptom,

       followUpQuestions:

followUpSymptoms[symptom].questions,

minimumAnswers:

followUpSymptoms[symptom].minimumAnswers

      };

    }

  }

// =====================
// NORMAL
// =====================

return {

  type: "normal",

  matched: null,

  followUpQuestions: [],

  minimumAnswers: 0

};
}

module.exports = runTriage;