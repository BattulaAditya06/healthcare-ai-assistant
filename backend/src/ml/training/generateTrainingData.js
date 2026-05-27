const diseases =
require("../datasets/diseases.json");

const {
  encodeSymptoms
} = require(
  "../encoders/symptomEncoder"
);

const generateTrainingData =
() => {

  const trainingData = [];

  diseases.forEach((disease) => {

    // Full Symptom Set
    trainingData.push({

      input:
        encodeSymptoms(
          disease.symptoms
        ),

      output:
        disease.name

    });

    // Partial Symptom Combinations
    for (
      let i = 0;
      i < disease.symptoms.length;
      i++
    ) {

      const partialSymptoms =
        disease.symptoms.filter(
          (_, index) =>
            index !== i
        );

      trainingData.push({

        input:
          encodeSymptoms(
            partialSymptoms
          ),

        output:
          disease.name

      });

    }

  });

  return trainingData;

};

module.exports =
generateTrainingData;