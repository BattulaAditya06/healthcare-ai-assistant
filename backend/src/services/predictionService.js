const diseases =
require(
  "../ml/datasets/diseases.json"
);

// =========================
// WEIGHTS
// =========================

const WEIGHTS = {

  primary: 30,

  secondary: 10,

  signature: 40,

  emergency: 80,

  combination: 30,

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
    symptom =>
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
 
  if (

    !Array.isArray(
      symptoms
    ) ||

    symptoms.length === 0

  ) {

    return [];

  }

  if (
  symptoms.length === 1
) {

  return [];

}

  const rankedDiseases =

    diseases.map(
      (diseaseData) => {

        let score = 0;

        let emergencyMatch =
          false;

        const matchedSymptoms =
          [];

        // PRIMARY

        safeArray(
          diseaseData.primarySymptoms
        ).forEach(
          symptom => {

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

        // SECONDARY

        safeArray(
          diseaseData.secondarySymptoms
        ).forEach(
          symptom => {

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

        // SIGNATURE

        safeArray(
          diseaseData.signatureSymptoms
        ).forEach(
          symptom => {

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

        // EMERGENCY

        safeArray(
          diseaseData.emergencySymptoms
        ).forEach(
          symptom => {

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

        // NEGATIVE

        safeArray(
          diseaseData.negativeSymptoms
        ).forEach(
          symptom => {

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

        // COMBINATION BONUS

        safeArray(
          diseaseData.symptomCombinations
        ).forEach(
          combination => {

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

        const uniqueMatches =

          [
            ...new Set(
              matchedSymptoms
            )
          ];

        // NO MATCH

        if (
          uniqueMatches.length === 0
        ) {

          return null;

        }

        // MATCH RATIO

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

        const matchRatio =

          totalSymptoms > 0

            ? uniqueMatches.length /
              totalSymptoms

            : 0;
const minimumMatches =

  symptoms.length <= 2
    ? symptoms.length
    : Math.ceil(
        symptoms.length * 0.6
      );

if (
  uniqueMatches.length <
  minimumMatches
) {

  return null;

}
        let  confidence = Math.min(

            90,

            Number(

              (
                score *

                (
                  0.5 +
                  matchRatio
                )

              ).toFixed(1)

            )

          );

        // SINGLE SYMPTOM PENALTY

    

        // LOW CONFIDENCE FILTER

        if (
          confidence < 15
        ) {

          return null;

        }

        return {

          disease:
            diseaseData.disease,

          category:
            diseaseData.category,

          confidence:
            Number(
              confidence.toFixed(1)
            ),

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
            diseaseData.recommendations || [],

          predictionType:
            "Rule Based Prediction"

        };

      }

    )

    .filter(Boolean)
.filter(
  disease =>
    disease.confidence >= 20
)
    .sort(
      (a, b) => {

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

        return (
          b.confidence -
          a.confidence
        );

      }
    )

    .slice(0, 5);

  console.log(
    "RULE PREDICTIONS:",
    rankedDiseases
  );

  return rankedDiseases;

};

module.exports =
  predictionService;