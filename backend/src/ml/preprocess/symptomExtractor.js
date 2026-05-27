const masterSymptoms =
require("../datasets/masterSymptoms.json");

const symptomSynonyms =
require("../datasets/symptomSynonyms.json");

const normalizeSymptoms =
require("../utils/symptomNormalizer");

const isNegated =
require("./negationDetector");

const extractSymptoms =
(text = "") => {

  const normalizedText =
    text.toLowerCase();

  let detectedSymptoms = [];

  // STEP 1 — Detect Direct Symptoms
  masterSymptoms.forEach(
    (symptom) => {

      // Skip negated symptoms
      if (
        isNegated(
          normalizedText,
          symptom
        )
      ) {

        return;

      }

      if (
        normalizedText.includes(
          symptom.toLowerCase()
        )
      ) {

        detectedSymptoms.push(
          symptom
        );

      }

    }
  );

  // STEP 2 — Detect Synonyms
  Object.keys(
    symptomSynonyms
  ).forEach((synonym) => {

    const mappedSymptom =
      symptomSynonyms[synonym];

    // Skip negated synonym
    if (
      isNegated(
        normalizedText,
        synonym
      )
    ) {

      return;

    }

    if (
      normalizedText.includes(
        synonym.toLowerCase()
      )
    ) {

      detectedSymptoms.push(
        mappedSymptom
      );

    }

  });

  // STEP 3 — Normalize
  detectedSymptoms =
    normalizeSymptoms(
      detectedSymptoms
    );

  // STEP 4 — Remove duplicates
  return [

    ...new Set(
      detectedSymptoms
    )

  ];

};

module.exports =
extractSymptoms;