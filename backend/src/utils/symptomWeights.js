const symptomWeights = {

  // HIGH PRIORITY SYMPTOMS
  fever: 5,
  "high fever": 6,

  "chest pain": 6,
  "shortness of breath": 6,

  vomiting: 4,
  diarrhea: 4,

  "loss of taste": 5,
  "loss of smell": 5,

  wheezing: 5,

  chills: 5,

  // MEDIUM PRIORITY
  headache: 4,
  "body pain": 5,
  fatigue: 3,

  nausea: 3,

  dizziness: 3,

  "abdominal pain": 4,

  "joint pain": 4,

  sweating: 3,

  // LOW PRIORITY
  cough: 3,
  "sore throat": 2,

  "runny nose": 2,

  sneezing: 2

};

module.exports =
  symptomWeights;