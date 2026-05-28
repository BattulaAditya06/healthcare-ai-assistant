const fs = require("fs");

const diseases = require(
  "../datasets/diseases.json"
);

const masterSymptoms = require(
  "../datasets/masterSymptoms.json"
);

const trainingData = [];

// CREATE VECTOR
const createVector = (
  symptoms
) => {

  return masterSymptoms.map(
    (symptom) =>

      symptoms.includes(symptom)
        ? 1
        : 0
  );

};

// GENERATE COMBINATIONS
const generateCombinations = (
  symptoms
) => {

  const combinations = [];

  // FULL SET
  combinations.push(symptoms);

  // REMOVE ONE SYMPTOM
  for (
    let i = 0;
    i < symptoms.length;
    i++
  ) {

    const partial =
      symptoms.filter(
        (_, index) =>
          index !== i
      );

    combinations.push(partial);

  }

  // REMOVE TWO SYMPTOMS
  for (
    let i = 0;
    i < symptoms.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < symptoms.length;
      j++
    ) {

      const partial =
        symptoms.filter(
          (_, index) =>

            index !== i &&
            index !== j
        );

      combinations.push(
        partial
      );

    }

  }

  return combinations;

};

// GENERATE TRAINING DATA
diseases.forEach(
  (disease) => {

    const combinations =
      generateCombinations(
        disease.symptoms
      );

    combinations.forEach(
      (symptoms) => {

        trainingData.push({

          input:
            createVector(
              symptoms
            ),

          output:
            disease.name

        });

      }
    );

  }
);

// SAVE FILE
fs.writeFileSync(

  "./src/ml/datasets/trainingData.json",

  JSON.stringify(
    trainingData,
    null,
    2
  )

);

console.log(
  "Training data generated successfully."
);