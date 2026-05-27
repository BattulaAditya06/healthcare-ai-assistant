const mlPredictor =
require("./mlPredictor");

const ruleBasedPredictor =
require("./ruleBasedPredictor");

const hybridPredictor =
async (symptoms) => {

  const mlResults =
    await mlPredictor(
      symptoms
    );

  const ruleResults =
    await ruleBasedPredictor(
      symptoms
    );

  let finalPrediction = null;

  // Both predictors agree
  if (

    mlResults.length > 0 &&
    ruleResults.length > 0 &&

    mlResults[0].disease ===
    ruleResults[0].disease

  ) {

    finalPrediction = {

      disease:
        mlResults[0].disease,

      confidence:
        Math.round(

          (
            mlResults[0].confidence +
            ruleResults[0]
              .matchPercentage
          ) / 2

        ),

      predictionType:
        "Hybrid Prediction",

      matchedSymptoms:
        ruleResults[0]
          .matchedSymptoms || [],

      riskLevel:
        ruleResults[0]
          .riskLevel || "unknown",

      department:
        ruleResults[0]
          .department || "General",

      recommendations:
        ruleResults[0]
          .recommendations || []

    };

  }

  // ML-only prediction
  else if (

    mlResults.length > 0 &&
    mlResults[0].confidence >= 80

  ) {

    finalPrediction = {

      disease:
        mlResults[0].disease,

      confidence:
        mlResults[0].confidence,

      predictionType:
        "ML Prediction",

      matchedSymptoms: [],

      riskLevel:
        "unknown",

      department:
        "General",

      recommendations: []

    };

  }

  // Rule-based fallback
  else if (
    ruleResults.length > 0
  ) {

    finalPrediction = {

      disease:
        ruleResults[0].disease,

      confidence:
        ruleResults[0]
          .matchPercentage,

      predictionType:
        "Rule-Based Prediction",

      matchedSymptoms:
        ruleResults[0]
          .matchedSymptoms || [],

      riskLevel:
        ruleResults[0]
          .riskLevel || "unknown",

      department:
        ruleResults[0]
          .department || "General",

      recommendations:
        ruleResults[0]
          .recommendations || []

    };

  }

  if (!finalPrediction) {

    return [];

  }

  return [finalPrediction];

};

module.exports =
hybridPredictor;