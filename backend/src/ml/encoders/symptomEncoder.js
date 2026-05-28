const masterSymptoms =
require("../datasets/masterSymptoms.json");

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