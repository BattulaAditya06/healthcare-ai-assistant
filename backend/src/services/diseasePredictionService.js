const Disease =
require("../models/Disease");

const symptomWeights =
require("../utils/symptomWeights");

const predictDiseases = async (
  symptoms
) => {

  const diseases =
    await Disease.find();

  const results = [];

  diseases.forEach((disease) => {

    const matchedSymptoms =
      disease.symptoms.filter(
        (symptom) =>
          symptoms.includes(symptom)
      );

    let matchedWeight = 0;

    let totalWeight = 0;

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

    const extraSymptoms =
      symptoms.filter(
        (symptom) =>
          !disease.symptoms.includes(
            symptom
          )
      );

    const penalty =
      extraSymptoms.length * 10;

    let finalScore = Math.max(
      0,

      Math.round(
        (
          (matchedWeight /
            totalWeight) * 100
        ) - penalty
      )
    );

    if (
      disease.criticalSymptoms
    ) {

      disease.criticalSymptoms.forEach(
        (symptom) => {

          if (
            symptoms.includes(symptom)
          ) {

            finalScore += 10;

          } else {

            finalScore -= 8;

          }

        }
      );
    }

    finalScore = Math.max(
      0,
      Math.min(finalScore, 100)
    );

    if (
      finalScore >= 45 &&
      matchedSymptoms.length >= 2
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

  results.sort(
    (a, b) =>
      b.matchPercentage -
      a.matchPercentage
  );

  return results;
};

module.exports = {
  predictDiseases
};