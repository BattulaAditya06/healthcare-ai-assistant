const diseases = require(
  "../datasets/diseases.json"
);
const calibrateConfidence =
require(
  "./confidenceCalibrator"
);
const mlPredictor = require(
  "./mlPredictor"
);

const hybridPredictor =
async (

  symptoms,

  negativeSymptoms = []

) => {

  try {

    // ML RESULTS
    const mlResults =
      await mlPredictor(
        symptoms
      );

    // FALLBACK WEIGHTED MATCHING
    const fallbackResults =
      diseases
        .map((disease) => {

          // PRIMARY SYMPTOMS
          const matchedPrimary =
            symptoms.filter(
              (symptom) =>

                disease.primarySymptoms?.includes(
                  symptom
                )
            );

          // SECONDARY SYMPTOMS
          const matchedSecondary =
            symptoms.filter(
              (symptom) =>

                disease.secondarySymptoms?.includes(
                  symptom
                )
            );

          // EMERGENCY SYMPTOMS
          const matchedEmergency =
            symptoms.filter(
              (symptom) =>

                disease.emergencySymptoms?.includes(
                  symptom
                )
            );

          // WEIGHTED SCORE
          const primaryScore =
            matchedPrimary.length * 70;

          const secondaryScore =
            matchedSecondary.length * 10;

          const emergencyScore =
            matchedEmergency.length * 100;

          const totalScore =
            primaryScore +
            secondaryScore +
            emergencyScore;

          // MAX POSSIBLE SCORE
          const maxPossibleScore =
            (
              (disease.primarySymptoms?.length || 0) * 70
            ) +
            (
              (disease.secondarySymptoms?.length || 0) * 10
            ) +
            (
              (disease.emergencySymptoms?.length || 0) * 100
            );

          // NORMALIZED CONFIDENCE
          const normalizedConfidence =
            maxPossibleScore > 0
              ? (
                  totalScore /
                  maxPossibleScore
                ) * 100
              : 0;

          return {

            disease:
              disease.name,

            confidence:
              Number(
                normalizedConfidence.toFixed(1)
              ),

            predictionType:
              mlResults &&
              mlResults.length > 0
                ? "Hybrid ML Prediction"
                : "Weighted Fallback Prediction",

            matchedSymptoms: [
              ...matchedPrimary,
              ...matchedSecondary,
              ...matchedEmergency
            ],

            emergencyMatch:
              matchedEmergency.length > 0,

            riskLevel:
              disease.riskLevel,

            department:
              disease.department,

            recommendations:
              disease.recommendations

          };

        })

        .filter(
          (disease) =>
            disease.confidence >= 20
        )

        .sort(
          (a, b) =>
            b.confidence -
            a.confidence
        )

        .slice(0, 5);

    // IF ML RESULTS EXIST
    if (
      mlResults &&
      mlResults.length > 0
    ) {

      const enrichedResults =
        mlResults.map(
          (prediction) => {

            const diseaseData =
              diseases.find(

                (disease) =>

                  disease.name ===
                  prediction.disease

              );

            // IF NO DATA FOUND
            if (!diseaseData) {

              return {

                disease:
                  prediction.disease,

                confidence:
                  prediction.confidence,

                predictionType:
                  "ML Prediction",

                matchedSymptoms:
                  symptoms,

                emergencyMatch:
                  false,

                riskLevel:
                  "unknown",

                department:
                  "General",

                recommendations:
                  []

              };

            }

            // COMBINED SYMPTOMS
            const allSymptoms = [

              ...(diseaseData.primarySymptoms || []),

              ...(diseaseData.secondarySymptoms || []),

              ...(diseaseData.emergencySymptoms || [])

            ];

            // MATCHED SYMPTOMS
            const matchedSymptoms =
              symptoms.filter(
                (symptom) =>

                  allSymptoms.includes(
                    symptom
                  )
              );

            // PRIMARY MATCH
            const matchedPrimary =
              symptoms.filter(
                (symptom) =>

                  diseaseData.primarySymptoms?.includes(
                    symptom
                  )
              );

            // SECONDARY MATCH
            const matchedSecondary =
              symptoms.filter(
                (symptom) =>

                  diseaseData.secondarySymptoms?.includes(
                    symptom
                  )
              );

            // EMERGENCY MATCH
            const matchedEmergency =
              symptoms.filter(
                (symptom) =>

                  diseaseData.emergencySymptoms?.includes(
                    symptom
                  )
              );

            // WEIGHTED SCORE
            const weightedScore =
              (
                matchedPrimary.length * 70 +
                matchedSecondary.length * 10 +
                matchedEmergency.length * 100
              );

            // MAX POSSIBLE SCORE
            const maxPossibleScore =
              (
                (diseaseData.primarySymptoms?.length || 0) * 70
              ) +
              (
                (diseaseData.secondarySymptoms?.length || 0) * 10
              ) +
              (
                (diseaseData.emergencySymptoms?.length || 0) * 100
              );

            // NORMALIZED WEIGHT SCORE
            const normalizedWeightedScore =
              maxPossibleScore > 0
                ? (
                    weightedScore /
                    maxPossibleScore
                  ) * 100
                : 0;

            // FINAL CONFIDENCE
            let finalConfidence =
(
  prediction.confidence * 0.7 +
  normalizedWeightedScore * 0.3
);

negativeSymptoms.forEach(
  (negativeSymptom) => {

    if (

      allSymptoms.includes(
        negativeSymptom
      )

    ) {

      finalConfidence *= 0.7;

    }

  }
);

            return {

              disease:
                prediction.disease,

              confidence:
  Number(
    finalConfidence.toFixed(1)
  ),

              predictionType:
                "Hybrid ML Prediction",

              matchedSymptoms,

              emergencyMatch:
                matchedEmergency.length > 0,

              riskLevel:
                diseaseData.riskLevel,

              department:
                diseaseData.department,

              recommendations:
                diseaseData.recommendations

            };

          }
        );

      enrichedResults.sort(
        (a, b) =>
          b.confidence -
          a.confidence
      );
const calibratedResults =
  calibrateConfidence(

    enrichedResults,

    symptoms.length

  );

  

    }

    // FALLBACK ONLY
    return calibrateConfidence(

  fallbackResults,

  symptoms.length

);

  } catch (error) {

    console.log(
      "Hybrid Predictor Error:",
      error.message
    );

    return [];

  }

};

module.exports =
hybridPredictor;