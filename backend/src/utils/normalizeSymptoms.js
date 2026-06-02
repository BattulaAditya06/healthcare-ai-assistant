const symptomMap = {
  "high temperature": "fever",

  feverish: "fever",

  "difficulty breathing": "breathing difficulty",

  breathlessness: "breathing difficulty",

  tiredness: "fatigue",

  exhausted: "fatigue",

  "throat pain": "sore throat",

  "chest pressure": "chest pain"
};

const normalizeSymptoms = (symptoms) => {
  return symptoms.map((symptom) => {
    return (
      symptomMap[symptom.toLowerCase()] ||
      symptom.toLowerCase()
    );
  });
};

module.exports = normalizeSymptoms;