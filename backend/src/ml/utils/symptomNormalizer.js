const normalizeSymptoms = (symptoms = []) => {
  if (!Array.isArray(symptoms)) {
    return [];
  }

  const normalized = symptoms
    .map(symptom =>
      symptom
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, "")
    )
    .filter(symptom => symptom.length > 0);

  return [...new Set(normalized)];
};

module.exports = normalizeSymptoms;