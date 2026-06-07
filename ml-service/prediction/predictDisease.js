const diseases =
require(
  "../datasets/diseases.json"
);

const symptomWeights =
require(
  "../datasets/symptomWeights.json"
);

// =========================
// GET SYMPTOM WEIGHT
// =========================

const getWeight = (
  symptom
) => {

  return (
    symptomWeights[
      symptom
    ] || 1
  );

};

// =========================
// PREDICT DISEASE
// =========================

const predictDisease = (

  symptoms = [],

  negativeSymptoms = []

) => {

  try {

    // =====================
    // EMPTY INPUT
    // =====================

    if (
      !symptoms.length
    ) {

      return [];

    }

    // =====================
    // PREDICTIONS
    // =====================

    const predictions =

      diseases.map(

        (disease) => {

          // =================
          // DISEASE DATA
          // =================

          const primarySymptoms =
            disease.primarySymptoms || [];

          const secondarySymptoms =
            disease.secondarySymptoms || [];

          const emergencySymptoms =
            disease.emergencySymptoms || [];

          const signatureSymptoms =
            disease.signatureSymptoms || [];

          const symptomCombinations =
            disease.symptomCombinations || [];

          // =================
          // ALL SYMPTOMS
          // =================

          const allSymptoms = [

            ...primarySymptoms,

            ...secondarySymptoms,

            ...emergencySymptoms,

            ...signatureSymptoms

          ];

          const uniqueDiseaseSymptoms = [

            ...new Set(
              allSymptoms
            )

          ];

          // =================
          // MATCHES
          // =================

          const matchedPrimary =
            symptoms.filter(

              (symptom) =>

                primarySymptoms.includes(
                  symptom
                )

            );

          const matchedSecondary =
            symptoms.filter(

              (symptom) =>

                secondarySymptoms.includes(
                  symptom
                )

            );

          const matchedEmergency =
            symptoms.filter(

              (symptom) =>

                emergencySymptoms.includes(
                  symptom
                )

            );

          const matchedSignature =
            symptoms.filter(

              (symptom) =>

                signatureSymptoms.includes(
                  symptom
                )

            );

          // =================
          // UNIQUE MATCHES
          // =================

          const uniqueMatches = [

            ...new Set([

              ...matchedPrimary,

              ...matchedSecondary,

              ...matchedEmergency,

              ...matchedSignature

            ])

          ];

          const totalMatches =
            uniqueMatches.length;

          // =================
          // NO MATCHES
          // =================

          if (
            totalMatches === 0
          ) {

            return null;

          }

          // =================
          // BLOCK SIGNATURE
          // ONLY INFLATION
          // =================

          if (

            matchedPrimary.length === 0 &&

            matchedSignature.length > 0

          ) {

            return null;

          }

          // =================
          // SCORE
          // =================

          let score = 0;

          // PRIMARY

          matchedPrimary.forEach(

            (symptom) => {

              score +=
                12 *
                getWeight(
                  symptom
                );

            }

          );

          // SECONDARY

          matchedSecondary.forEach(

            (symptom) => {

              score +=
                5 *
                getWeight(
                  symptom
                );

            }

          );

          // SIGNATURE

          matchedSignature.forEach(

            (symptom) => {

              score +=
                15 *
                getWeight(
                  symptom
                );

            }

          );

          // EMERGENCY

          matchedEmergency.forEach(

            (symptom) => {

              score +=
                10 *
                getWeight(
                  symptom
                );

            }

          );

          // =================
          // COMBINATION BONUS
          // =================

          symptomCombinations.forEach(

            (combination) => {

              const matched =
                combination.every(

                  (symptom) =>

                    symptoms.includes(
                      symptom
                    )

                );

              if (matched) {

                score += 10;

              }

            }

          );

          // =================
          // COVERAGE
          // =================

          const coverageRatio =

            totalMatches /

            Math.max(
              uniqueDiseaseSymptoms.length,
              1
            );

          score *=
            (
              0.6 +
              (
                coverageRatio * 0.4
              )
            );

          // =================
          // LOW INFORMATION
          // PENALTY
          // =================

          if (
            symptoms.length <= 1
          ) {

            score *= 0.45;

          }

          // =================
          // NEGATIVE SYMPTOMS
          // =================

          negativeSymptoms.forEach(

            (negativeSymptom) => {

              if (

                uniqueDiseaseSymptoms.includes(
                  negativeSymptom
                )

              ) {

                score *= 0.6;

              }

            }

          );

          // =================
          // LARGE DISEASE
          // STABILIZATION
          // =================

          if (

            uniqueDiseaseSymptoms.length >= 8

          ) {

            score *= 1.15;

          }

          // =================
          // NORMALIZATION
          // =================

          score = Math.min(
            score,
            95
          );

          // =================
          // MINIMUM THRESHOLD
          // =================

          if (
            score < 5
          ) {

            return null;

          }

          // =================
          // RETURN
          // =================

          return {

            disease:
              disease.name,

            confidence:
              Number(
                score.toFixed(1)
              ),

            predictionType:
              "Advanced Weighted Prediction",

            matchedSymptoms:
              uniqueMatches,

            emergencyMatch:
              matchedEmergency.length > 0,

            riskLevel:
              disease.riskLevel,

            department:
              disease.department,

            recommendations:
              disease.recommendations || [],

            scoreBreakdown: {

              primaryMatches:
                matchedPrimary.length,

              secondaryMatches:
                matchedSecondary.length,

              signatureMatches:
                matchedSignature.length,

              emergencyMatches:
                matchedEmergency.length,

              coverageRatio:
                Number(
                  coverageRatio.toFixed(2)
                )

            }

          };

        }

      )

      .filter(Boolean)

      // =====================
      // SORT DESCENDING
      // =====================

      .sort(

        (a, b) =>

          b.confidence -
          a.confidence

      )

      // =====================
      // TOP 5
      // =====================

      .slice(0, 5);

    return predictions;

  } catch (error) {

    console.log(

      "Predict Disease Error:",

      error.message

    );

    return [];

  }

};

module.exports =
  predictDisease;