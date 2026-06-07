const masterSymptoms =
require(
  "../ml/datasets/masterSymptoms.json"
);

const symptomSynonyms =
require(
  "../ml/datasets/symptomSynonyms.json"
);

const canonicalSymptoms =
new Set(

  masterSymptoms.map(

    (symptom) =>

      symptom
        .toLowerCase()
        .trim()

  )

);

// =========================
// NORMALIZE SINGLE
// =========================

const normalizeSymptom = (
  symptom = ""
) => {

  const cleanedSymptom =

    String(symptom)
      .toLowerCase()
      .trim();

  // =====================
  // SYNONYM FIRST
  // =====================

  if (

    symptomSynonyms[
      cleanedSymptom
    ]

  ) {

    return symptomSynonyms[
      cleanedSymptom
    ];

  }

  // =====================
  // CANONICAL
  // =====================

  if (

    canonicalSymptoms.has(
      cleanedSymptom
    )

  ) {

    return cleanedSymptom;

  }

  return null;

};

// =========================
// NORMALIZE ARRAY
// =========================

const normalizeSymptoms = (
  symptoms = []
) => {

  const normalized =

    symptoms

      .map(normalizeSymptom)

      .filter(Boolean);

  return [

    ...new Set(normalized)

  ];

};

module.exports = {

  normalizeSymptom,

  normalizeSymptoms

};
