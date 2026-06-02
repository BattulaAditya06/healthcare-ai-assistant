const Disease =
require("../../models/Disease");

const symptomWeights =
require("../../utils/symptomWeights");

const ruleBasedPredictor =
async (symptoms) => {

  const diseases =
    await Disease.find();

  const results = [];

  diseases.forEach((disease) => {

    // Matched Symptoms
    const matchedSymptoms =
      disease.symptoms.filter(
        (symptom) =>
          symptoms.includes(symptom)
      );

    let matchedWeight = 0;

    let totalWeight = 0;

    // Calculate weights
    disease.symptoms.forEach(
      (symptom) => {

        totalWeight +=
          symptomWeights[symptom] || 1;

        if (
          symptoms.includes(symptom)
        ) {

          matchedWeight +=
            symptomWeights[symptom] || 1;

        }

      }
    );

    // Extra symptoms penalty
    const extraSymptoms =
      symptoms.filter(
        (symptom) =>
          !disease.symptoms.includes(
            symptom
          )
      );

    const penalty =
      extraSymptoms.length * 5;

    // Base score
    let finalScore = Math.max(

      0,

      Math.round(

        (
          (matchedWeight /
            totalWeight) * 100
        ) - penalty

      )

    );

    // Critical symptom boosting
    if (
      disease.criticalSymptoms
    ) {

      disease.criticalSymptoms.forEach(
        (symptom) => {

          if (
            symptoms.includes(symptom)
          ) {

            finalScore += 10;

          }

        }
      );

    }

    // Score limit
    finalScore = Math.max(
      0,
      Math.min(finalScore, 100)
    );

    // Push prediction
    if (

      finalScore >= 30 &&
      matchedSymptoms.length >= 1

    ) {

      results.push({

        disease:
          disease.name,

        matchedSymptoms,

        matchPercentage:
          finalScore,

        confidence:

          finalScore >= 80
            ? "High"

            : finalScore >= 50
            ? "Medium"

            : "Low",

        riskLevel:
          disease.riskLevel,

        department:
          disease.department,

        recommendations:
          disease.recommendations

      });

    }

  });

  // Sort descending
  results.sort(
    (a, b) =>
      b.matchPercentage -
      a.matchPercentage
  );

  return results;

};

module.exports =
ruleBasedPredictor;