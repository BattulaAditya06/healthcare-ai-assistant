const diseases =
  require("../datasets/diseases.json");

const symptomWeights =
  require("../datasets/symptomWeights.json");

// =========================
// GET SYMPTOM WEIGHT
// =========================

const getWeight = (
  symptom
) => {

  return (
    symptomWeights[symptom] || 1
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

    if (!symptoms.length) {

      return [];

    }

    const predictions =

      diseases.map(

        (disease) => {

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

          const allSymptoms = [

            ...primarySymptoms,

            ...secondarySymptoms,

            ...emergencySymptoms,

            ...signatureSymptoms

          ];

          const uniqueDiseaseSymptoms = [

            ...new Set(allSymptoms)

          ];

          // =====================
          // MATCHES
          // =====================

          const matchedPrimary =
            symptoms.filter(

              symptom =>

                primarySymptoms.includes(
                  symptom
                )

            );

          const matchedSecondary =
            symptoms.filter(

              symptom =>

                secondarySymptoms.includes(
                  symptom
                )

            );

          const matchedEmergency =
            symptoms.filter(

              symptom =>

                emergencySymptoms.includes(
                  symptom
                )

            );

          const matchedSignature =
            symptoms.filter(

              symptom =>

                signatureSymptoms.includes(
                  symptom
                )

            );

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

          // =====================
          // NO REAL EVIDENCE
          // =====================

          if (

            matchedPrimary.length === 0 &&

            matchedSignature.length === 0

          ) {

            return null;

          }

          // =====================
          // PREVENT
          // FEVER -> 10 DISEASES
          // =====================

          if (

            symptoms.length <= 1 &&

            matchedPrimary.length < 2 &&

            matchedSignature.length === 0

          ) {

            return null;

          }

          // =====================
          // SCORE
          // =====================

          let score = 0;

          // PRIMARY

          matchedPrimary.forEach(

            symptom => {

              score +=

                25 *

                getWeight(symptom);

            }

          );

          // SECONDARY

          matchedSecondary.forEach(

            symptom => {

              score +=

                10 *

                getWeight(symptom);

            }

          );

          // SIGNATURE

          matchedSignature.forEach(

            symptom => {

              score +=

                40 *

                getWeight(symptom);

            }

          );

          // EMERGENCY

          matchedEmergency.forEach(

            symptom => {

              score +=

                20 *

                getWeight(symptom);

            }

          );

          // =====================
          // COMBINATION BONUS
          // =====================

          symptomCombinations.forEach(

            combination => {

              const matched =

                combination.every(

                  symptom =>

                    symptoms.includes(
                      symptom
                    )

                );

              if (matched) {

                score += 25;

              }

            }

          );

          // =====================
          // COVERAGE
          // =====================

          const coverageRatio =

            totalMatches /

            Math.max(
              uniqueDiseaseSymptoms.length,
              1
            );

          score *=

            (

              0.7 +

              (

                coverageRatio * 0.3

              )

            );

          // =====================
          // NEGATIVE SYMPTOMS
          // =====================

          negativeSymptoms.forEach(

            negativeSymptom => {

              if (

                uniqueDiseaseSymptoms.includes(
                  negativeSymptom
                )

              ) {

                score *= 0.6;

              }

            }

          );

          // =====================
          // CONFIDENCE
          // =====================

          const confidence =

            Math.min(

              95,

              Math.max(

                5,

                (

                  totalMatches /

                  uniqueDiseaseSymptoms.length

                ) * 100

              )

            );

          // =====================
          // MINIMUM QUALITY
          // =====================

          if (

            confidence < 15

          ) {

            return null;

          }

          return {

            disease:
              disease.name,

            confidence:
              Number(
                confidence.toFixed(1)
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

      .sort(

        (a, b) =>

          b.confidence -

          a.confidence

      )

      .slice(0, 3);

    // =====================
    // NOT ENOUGH DATA
    // =====================

    if (

      predictions.length === 0

    ) {

      return [

        {

          disease:
            "Insufficient Information",

          confidence: 0,

          riskLevel: "unknown",

          department:
            "General Medicine",

          recommendations: [

            "Please provide additional symptoms for a reliable prediction"

          ]

        }

      ];

    }

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