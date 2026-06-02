
const diseases =
require(
  "./datasets/diseases.json"
);

const SAFE_FALLBACKS = [

  "fatigue",

  "headache",

  "body pain",

  "nausea",

  "sore throat",

  "vomiting",

  "dizziness"

];

const rankFollowUpQuestions =
(

  predictions,

  currentSymptoms = [],

  negativeSymptoms = [],

  askedSymptoms = []

) => {

  // NORMALIZE
  const normalizedCurrent =
    currentSymptoms.map(
      (symptom) =>

        symptom
          .toLowerCase()
          .trim()
    );

  const normalizedNegative =
    negativeSymptoms.map(
      (symptom) =>

        symptom
          .toLowerCase()
          .trim()
    );

  const normalizedAsked =
    askedSymptoms.map(
      (symptom) =>

        symptom
          .toLowerCase()
          .trim()
    );

  const symptomScores = {};

  // TOP PREDICTIONS
  const topDiseases =
    predictions.slice(0, 3);

  topDiseases.forEach(
    (prediction, index) => {

      const disease =
        diseases.find(
          (d) =>

            d.name ===
            prediction.disease
        );

      if (!disease) {

        return;

      }

      const allSymptoms = [

        ...(disease.primarySymptoms || []),

        ...(disease.secondarySymptoms || [])

      ];

      allSymptoms.forEach(
        (symptom) => {

          const normalized =
            symptom
              .toLowerCase()
              .trim();

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

          if (
            !symptomScores[
              symptom
            ]
          ) {

            symptomScores[
              symptom
            ] = 0;

          }

          // WEIGHT
          symptomScores[
            symptom
          ] += (3 - index);

        }
      );

    }
  );

  // SORT
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

  // PRIMARY FOLLOWUP
  if (
    rankedSymptoms.length > 0
  ) {

    return [

      `Do you also have ${rankedSymptoms[0]}?`

    ];

  }

  // SAFE FALLBACKS
  const availableFallback =
    SAFE_FALLBACKS.find(
      (symptom) => {

        const normalized =
          symptom
            .toLowerCase()
            .trim();

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

  if (
    availableFallback
  ) {

    return [

      `Do you also have ${availableFallback}?`

    ];

  }

  // NOTHING LEFT
  return [];

};

module.exports =
  rankFollowUpQuestions;
