const masterSymptoms =
require("../../backend/src/ml/datasets/masterSymptoms.json");

const encodeSymptoms =
(symptoms = []) => {

  return masterSymptoms.map(
    (symptom) =>

      symptoms.includes(symptom)
        ? 1
        : 0
  );

};

module.exports = {
  encodeSymptoms,
  masterSymptoms
};