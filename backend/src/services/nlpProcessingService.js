
console.log(
  "NEW NLP SERVICE RUNNING"
);

// =========================
// IMPORTS
// =========================

const masterSymptoms =
require(
  "../ml/datasets/masterSymptoms.json"
);

const symptomSynonyms =
require(
  "../ml/datasets/symptomSynonyms.json"
);

const {
  normalizeSymptoms
} = require(
  "../utils/normalizeSymptoms"
);

// =========================
// CLEAN MASTER SYMPTOMS
// =========================

const cleanedSymptoms =

  masterSymptoms

    .map(

      (symptom) =>

        String(symptom)
          .toLowerCase()
          .trim()

    )

    .filter(Boolean);

// =========================
// ESCAPE REGEX
// =========================

const escapeRegex = (
  text = ""
) => {

  return text.replace(

    /[.*+?^${}()|[\]\\]/g,

    "\\$&"

  );

};

// =========================
// PROCESS SYMPTOMS
// =========================

const processSymptoms = (

  message = ""

) => {

  // =====================
  // NORMALIZE MESSAGE
  // =====================

  let normalizedMessage =

    String(message)
      .toLowerCase()
      .trim();
    // Remove yes/no prefixes

normalizedMessage =

  normalizedMessage

    .replace(
      /^yes\s+/i,
      ""
    )

    .replace(
      /^yeah\s+/i,
      ""
    )

    .replace(
      /^yup\s+/i,
      ""
    )

    .replace(
      /^i have\s+/i,
      ""
    )

    .trim();
  console.log(
    "CHAT MESSAGE:",
    normalizedMessage
  );

  // =====================
  // APPLY SYNONYMS
  // =====================

  Object.entries(
    symptomSynonyms
  )

    .sort(

      ([a], [b]) =>

        b.length - a.length

    )

    .forEach(

      ([alias, canonical]) => {

        const escapedAlias =
          escapeRegex(alias);

        const aliasRegex =
          new RegExp(

            `\\b${escapedAlias}\\b`,

            "gi"

          );

        normalizedMessage =

          normalizedMessage.replace(

            aliasRegex,

            canonical

          );

      }

    );

  // =====================
  // CLEAN SPACES
  // =====================

  normalizedMessage =

    normalizedMessage

      .replace(

        /\s+/g,

        " "

      )

      .trim();

  console.log(
    "NORMALIZED MESSAGE:",
    normalizedMessage
  );

  // =====================
  // DETECT SYMPTOMS
  // =====================

  const detectedSymptoms =
    new Set();

  cleanedSymptoms.forEach(

    (symptom) => {

      const escapedSymptom =
        escapeRegex(symptom);

      const regex =
        new RegExp(

          `\\b${escapedSymptom}\\b`,

          "i"

        );

      if (

        regex.test(
          normalizedMessage
        )

      ) {

        detectedSymptoms.add(
          symptom
        );

      }

    }

  );

  // =====================
  // FINAL NORMALIZATION
  // =====================

  const normalizedSymptoms =

    normalizeSymptoms(

      [...detectedSymptoms]

    );

  console.log(
    "FINAL SYMPTOMS:",
    normalizedSymptoms
  );

  // =====================
  // SEVERITY DETECTION
  // =====================

  let severity = "low";

  const highSeverityWords = [

    "severe",
    "extreme",
    "critical",
    "unbearable"

  ];

  const mediumSeverityWords = [

    "moderate",
    "painful",
    "bad"

  ];

  if (

    highSeverityWords.some(

      (word) =>

        normalizedMessage.includes(
          word
        )

    )

  ) {

    severity = "high";

  }

  else if (

    mediumSeverityWords.some(

      (word) =>

        normalizedMessage.includes(
          word
        )

    )

  ) {

    severity = "medium";

  }

  // =====================
  // TEMPORAL STATUS
  // =====================

  let temporalStatus =
    "active";

  const resolvedWords = [

    "resolved",
    "recovered",
    "gone now",
    "improved"

  ];

  const pastWords = [

    "had",
    "previously",
    "last week",
    "before"

  ];

  if (

    resolvedWords.some(

      (word) =>

        normalizedMessage.includes(
          word
        )

    )

  ) {

    temporalStatus =
      "resolved";

  }

  else if (

    pastWords.some(

      (word) =>

        normalizedMessage.includes(
          word
        )

    )

  ) {

    temporalStatus =
      "past";

  }

  // =====================
  // RETURN
  // =====================

  return {

    symptoms:
      normalizedSymptoms,

    severity,

    temporalStatus

  };

};

// =========================
// EXPORT
// =========================

module.exports = {
  processSymptoms
};
