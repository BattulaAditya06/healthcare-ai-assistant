const diseases =
require(
  "../datasets/diseases.json"
);

const predictDisease =
(
  symptoms = [],

  negativeSymptoms = []

) => {

  try {

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

          // =====================
          // ALL SYMPTOMS
          // =====================

          const allSymptoms = [

            ...primarySymptoms,

            ...secondarySymptoms,

            ...emergencySymptoms,

            ...signatureSymptoms

          ];

          // =====================
          // MATCHES
          // =====================

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

          // =====================
          // UNIQUE MATCHES
          // =====================

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
          // PREVENT
          // SIGNATURE-ONLY
          // INFLATION
          // =====================

          if (

            matchedPrimary.length === 0 &&

            matchedSignature.length > 0

          ) {

            return null;

          }

          // =====================
          // MISSING SYMPTOMS
          // =====================

          const missingPrimary =

            primarySymptoms.filter(

              (symptom) =>

                !symptoms.includes(
                  symptom
                )

            );

          const missingSignature =

            signatureSymptoms.filter(

              (symptom) =>

                !symptoms.includes(
                  symptom
                )

            );

          // =====================
          // NO MATCHES
          // =====================

          if (
            totalMatches === 0
          ) {

            return null;

          }

          // =====================
          // BASE SCORE
          // =====================

          let score = 0;

          // PRIMARY

          score +=
            matchedPrimary.length * 15;

          // SECONDARY

          score +=
            matchedSecondary.length * 5;

          // SIGNATURE

          score +=
            matchedSignature.length * 12;

          // EMERGENCY

          score +=
            matchedEmergency.length * 10;

          // =====================
          // PENALTIES
          // =====================

          score -=
            missingPrimary.length * 12;

          score -=
            missingSignature.length * 10;

          // =====================
          // COVERAGE BONUS
          // =====================

          const coverageBonus =

            allSymptoms.length > 0

              ? (
                  totalMatches /
                  allSymptoms.length
                ) * 10

              : 0;

          score +=
            coverageBonus;

          // =====================
          // RELIABILITY
          // =====================

          const reliability =

            allSymptoms.length > 0

              ? totalMatches /
                allSymptoms.length

              : 0;

          // =====================
          // SAFE RELIABILITY
          // MULTIPLIER
          // =====================

          score *=
            (
              0.5 +
              (
                reliability * 0.5
              )
            );

          // =====================
          // COMBINATION BONUS
          // =====================

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

                score += 8;

              }

            }

          );

          // =====================
          // LOW INFORMATION
          // PENALTY
          // =====================

          if (
            symptoms.length <= 1
          ) {

            score *= 0.35;

          }

          // =====================
          // NEGATIVE SYMPTOMS
          // =====================

          negativeSymptoms.forEach(

            (negativeSymptom) => {

              if (

                allSymptoms.includes(
                  negativeSymptom
                )

              ) {

                score *= 0.8;

              }

            }

          );

          // =====================
          // FINAL EVIDENCE
          // STRENGTH
          // =====================

          const evidenceStrength =

            totalMatches /

            Math.max(
              allSymptoms.length,
              1
            );

          score *=
            (0.5+(evidenceStrength*0.5));

          // =====================
          // NORMALIZATION
          // =====================

          score =
            Math.max(
              0,
              Math.min(
                score,
                95
              )
            );

          // =====================
          // MINIMUM THRESHOLD
          // =====================

          if (
            score < 5
          ) {

            return null;

          }

          // =====================
          // RETURN
          // =====================

          return {

            disease:
              disease.name,

            confidence:
              Number(
                score.toFixed(1)
              ),

            predictionType:
              "Weighted Prediction",

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

              missingPrimary:
                missingPrimary.length,

              missingSignature:
                missingSignature.length,

              reliability:
                Number(
                  reliability.toFixed(2)
                )

            }

          };

        }

      )

      .filter(Boolean)

// =====================
// SORT
// =====================

.sort(

  (a, b) =>

    b.confidence -
    a.confidence

)

// =====================
// DIFFERENTIAL
// NORMALIZATION
// =====================

.map(

  (
    prediction,
    index,
    array
  ) => {

    const topScore =

      array[0]
        ?.confidence || 1;

    // =================
    // RELATIVE STRENGTH
    // =================

    const relativeStrength =

      prediction.confidence /
      topScore;

    // =================
    // SUPPRESS WEAKER
    // DISEASES
    // =================

    let adjustedConfidence =

      prediction.confidence *
      relativeStrength;

    // =================
    // ADD RANK DECAY
    // =================

    adjustedConfidence *=

      1 - (index * 0.04);

    return {

      ...prediction,

      confidence:
        Number(

          adjustedConfidence.toFixed(
            1
          )

        )

    };

  }

)

// =====================
// REMOVE VERY WEAK
// =====================

.filter(

  (prediction) =>

    prediction.confidence >= 2

)

// =====================
// FINAL SORT
// =====================

.sort(

  (a, b) =>

    b.confidence -
    a.confidence

)

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