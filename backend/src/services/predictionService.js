const diseases =
require(
  "../ml/datasets/diseases.json"
);

// =========================
// WEIGHTS
// =========================

const WEIGHTS = {

  primary: 25,

  secondary: 10,

  signature: 40,

  emergency: 60,

  combination: 45,

  negative: -20

};

// =========================
// SAFE ARRAY
// =========================

const safeArray = (
  value
) => {

  return Array.isArray(value)
    ? value
    : [];

};

// =========================
// CHECK COMBINATION
// =========================

const hasCombination = (

  symptoms,

  combination

) => {

  return combination.every(

    (symptom) =>

      symptoms.includes(
        symptom
      )

  );

};

// =========================
// PREDICTION ENGINE
// =========================

const predictionService = (
  symptoms = []
) => {

  // =====================
  // VALIDATION
  // =====================

  if (

    !Array.isArray(
      symptoms
    ) ||

    symptoms.length === 0

  ) {

    return [];

  }

  // =====================
  // RANK DISEASES
  // =====================

  const rankedDiseases =

    diseases.map(
      (diseaseData) => {

        let score = 0;

        let emergencyMatch =
          false;

        const matchedSymptoms =
          [];

        // =================
        // PRIMARY
        // =================

        safeArray(

          diseaseData.primarySymptoms

        ).forEach(
          (symptom) => {

            if (

              symptoms.includes(
                symptom
              )

            ) {

              score +=
                WEIGHTS.primary;

              matchedSymptoms.push(
                symptom
              );

            }

          }
        );

        // =================
        // SECONDARY
        // =================

        safeArray(

          diseaseData.secondarySymptoms

        ).forEach(
          (symptom) => {

            if (

              symptoms.includes(
                symptom
              )

            ) {

              score +=
                WEIGHTS.secondary;

              matchedSymptoms.push(
                symptom
              );

            }

          }
        );

        // =================
        // SIGNATURE
        // =================

        safeArray(

          diseaseData.signatureSymptoms

        ).forEach(
          (symptom) => {

            if (

              symptoms.includes(
                symptom
              )

            ) {

              score +=
                WEIGHTS.signature;

              matchedSymptoms.push(
                symptom
              );

            }

          }
        );

        // =================
        // EMERGENCY
        // =================

        safeArray(

          diseaseData.emergencySymptoms

        ).forEach(
          (symptom) => {

            if (

              symptoms.includes(
                symptom
              )

            ) {

              score +=
                WEIGHTS.emergency;

              emergencyMatch =
                true;

              matchedSymptoms.push(
                symptom
              );

            }

          }
        );

        // =================
        // NEGATIVE
        // =================

        safeArray(

          diseaseData.negativeSymptoms

        ).forEach(
          (symptom) => {

            if (

              symptoms.includes(
                symptom
              )

            ) {

              score +=
                WEIGHTS.negative;

            }

          }
        );

        // =================
        // COMBINATIONS
        // =================

        safeArray(

          diseaseData.symptomCombinations

        ).forEach(
          (combination) => {

            if (

              hasCombination(

                symptoms,

                combination

              )

            ) {

              score +=
                WEIGHTS.combination;

            }

          }
        );

        // =================
        // MATCH COUNT
        // =================

        const totalSymptoms =

          safeArray(
            diseaseData.primarySymptoms
          ).length +

          safeArray(
            diseaseData.secondarySymptoms
          ).length +

          safeArray(
            diseaseData.signatureSymptoms
          ).length +

          safeArray(
            diseaseData.emergencySymptoms
          ).length;

        const uniqueMatches =

          [
            ...new Set(
              matchedSymptoms
            )
          ];

        const matchRatio =

          totalSymptoms > 0

            ? uniqueMatches.length /
              totalSymptoms

            : 0;

        // =================
        // CONFIDENCE
        // =================

        let confidence =

          Math.min(

            92,

            Math.max(

              5,

              Number(

                (
                  score *
                  0.75 *

                  (
                    0.5 +
                    matchRatio
                  )

                ).toFixed(1)

              )

            )

          );

        // =================
        // LOW MATCH FILTER
        // =================

        if (

          uniqueMatches.length ===
            0 ||

          confidence < 15

        ) {

          return null;

        }

        // =================
        // RESULT
        // =================

        return {

          disease:
            diseaseData.disease,

          category:
            diseaseData.category,

          confidence,

          department:
            diseaseData.department,

          riskLevel:
            diseaseData.riskLevel,

          severityScore:
            diseaseData.severityScore,

          matchedSymptoms:
            uniqueMatches,

          emergencyMatch,

          recommendations:
            diseaseData.recommendations,

          predictionType:
            "Advanced Weighted Prediction"

        };

      }

    )

    .filter(Boolean)

    .sort(
      (a, b) => {

        // Emergency priority

        if (

          a.emergencyMatch &&

          !b.emergencyMatch

        ) {

          return -1;

        }

        if (

          !a.emergencyMatch &&

          b.emergencyMatch

        ) {

          return 1;

        }

        // Confidence

        return (

          b.confidence -
          a.confidence

        );

      }
    )

    .slice(0, 5);

  // =====================
  // FALLBACK
  // =====================

  if (

    rankedDiseases.length === 0

  ) {

    rankedDiseases.push({

      disease:
        "General Viral Infection",

      category:
        "General Medicine",

      confidence: 20,

      department:
        "General Medicine",

      riskLevel:
        "low",

      severityScore: 2,

      matchedSymptoms:
        symptoms,

      emergencyMatch:
        false,

      recommendations: [

        "Take rest",

        "Stay hydrated",

        "Monitor symptoms"

      ],

      predictionType:
        "Fallback Prediction"

    });

  }

  // =====================
  // DEBUG
  // =====================

  console.log(
    "RANKED:",
    rankedDiseases
  );

  return rankedDiseases;

};

module.exports =
  predictionService;