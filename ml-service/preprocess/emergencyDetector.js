const emergencySymptoms =
require(
  "../datasets/emergencySymptoms.json"
);

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

module.exports =
detectEmergency;