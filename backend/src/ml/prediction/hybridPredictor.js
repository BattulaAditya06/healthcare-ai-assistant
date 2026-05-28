const diseases = require(
  "../datasets/diseases.json"
);

const mlPredictor = require(
  "./mlPredictor"
);

const hybridPredictor =
async (symptoms) => {

  try {

    // ML PREDICTIONS
    const mlResults =
      await mlPredictor(
        symptoms
      );

    // NO RESULTS
    if (
      !mlResults ||
      mlResults.length === 0
    ) {

      return [];

    }

    // ENRICH RESULTS
    const enrichedResults =
      mlResults.map(
        (prediction) => {

          const diseaseData =
            diseases.find(

              (disease) =>

                disease.name ===
                prediction.disease

            );

          // IF NO METADATA
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

              riskLevel:
                "unknown",

              department:
                "General",

              recommendations:
                []

            };

          }

          // MATCHED SYMPTOMS
          const matchedSymptoms =
            symptoms.filter(
              (symptom) =>

                diseaseData.symptoms.includes(
                  symptom
                )
            );

          // FINAL RESPONSE
          return {

            disease:
              prediction.disease,

            confidence:
              prediction.confidence,

            predictionType:
              "Hybrid Prediction",

            matchedSymptoms,

            riskLevel:
              diseaseData.riskLevel,

            department:
              diseaseData.department,

            recommendations:
              diseaseData.recommendations

          };

        }
      );

    // SORT BY CONFIDENCE
    enrichedResults.sort(

      (a, b) =>

        b.confidence -
        a.confidence

    );

    return enrichedResults;

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