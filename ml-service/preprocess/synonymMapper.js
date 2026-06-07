const symptomSynonyms = require("../datasets/symptomSynonyms.json");

const mapSynonyms = (symptoms = []) => {
  return symptoms.map(symptom => {
    return symptomSynonyms[symptom] || symptom;
  });
};

module.exports = mapSynonyms;