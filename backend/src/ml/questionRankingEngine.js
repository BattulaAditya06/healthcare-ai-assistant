
const diseases =
require(
  "./datasets/diseases.json"
);

// =========================
// SAFE FALLBACKS
// =========================

const SAFE_FALLBACKS = [

  "fatigue",

  "nausea",

  "dizziness",

  "vomiting",

  "body pain",

  "sore throat"

];

// =========================
// NORMALIZE
// =========================

const normalize =
(text = "") =>

  text
    .toLowerCase()
    .trim();

// =========================
// QUESTION RANKER
// =========================

const rankFollowUpQuestions =
(

  predictions = [],

  currentSymptoms = [],

  negativeSymptoms = [],

  askedSymptoms = []

) => {

  const normalizedCurrent =
    currentSymptoms.map(
      normalize
    );

  const normalizedNegative =
    negativeSymptoms.map(
      normalize
    );

  const normalizedAsked =
    askedSymptoms.map(
      normalize
    );

  const symptomScores = {};

  // =========================
  // TOP DISEASES ONLY
  // =========================

  const topPredictions =
    predictions.slice(0, 3);

  topPredictions.forEach(

    (
      prediction,
      index
    ) => {

      const disease =
        diseases.find(

          (d) =>

            d.name ===
            prediction.disease

        );

      if (!disease) {

        return;

      }

      // =========================
      // DISEASE SYMPTOMS
      // =========================

      const diseaseSymptoms = [

        ...(disease.primarySymptoms || []),

        ...(disease.secondarySymptoms || [])

      ];

      diseaseSymptoms.forEach(

        (symptom) => {

          const normalized =
            normalize(
              symptom
            );

          // SKIP EXISTING
          if (

            normalizedCurrent.includes(
              normalized
            )

          ) {

            return;

          }

          // SKIP NEGATIVE
          if (

            normalizedNegative.includes(
              normalized
            )

          ) {

            return;

          }

          // SKIP ASKED
          if (

            normalizedAsked.includes(
              normalized
            )

          ) {

            return;

          }

          // INIT
          if (
            !symptomScores[
              symptom
            ]
          ) {

            symptomScores[
              symptom
            ] = 0;

          }

          // =========================
          // WEIGHTING
          // =========================

          const confidenceWeight =
            prediction.confidence / 10;

          const rankingWeight =
            3 - index;

          symptomScores[
            symptom
          ] +=

            confidenceWeight *

            rankingWeight;

        }

      );

    }

  );

  // =========================
  // SORT
  // =========================

  const rankedSymptoms =

    Object.entries(
      symptomScores
    )

      .sort(
        (a, b) =>

          b[1] - a[1]
      )

      .map(

        ([symptom]) =>

          symptom

      );

  console.log(
    "RANKED:",
    rankedSymptoms
  );

  // =========================
  // BEST FOLLOWUP
  // =========================

  if (
    rankedSymptoms.length > 0
  ) {

    return [

      `Do you also have ${rankedSymptoms[0]}?`

    ];

  }

  // =========================
  // SAFE FALLBACKS
  // =========================

  const fallback =
    SAFE_FALLBACKS.find(

      (symptom) => {

        const normalized =
          normalize(symptom);

        return (

          !normalizedCurrent.includes(
            normalized
          ) &&

          !normalizedNegative.includes(
            normalized
          ) &&

          !normalizedAsked.includes(
            normalized
          )

        );

      }

    );

  if (fallback) {

    return [

      `Do you also have ${fallback}?`

    ];

  }

  // =========================
  // NOTHING LEFT
  // =========================

  return [];

};

module.exports =
  rankFollowUpQuestions;
