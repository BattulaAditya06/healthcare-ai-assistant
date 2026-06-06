
const fs = require("fs");

const diseases = require(
  "./datasets/diseases.json"
);

const masterSymptoms = require(
  "./datasets/masterSymptoms.json"
);


const trainingData = [];

// =========================
// CREATE VECTOR
// =========================

const createVector = (
  symptoms
) => {

  return masterSymptoms.map(

    (symptom) =>

      symptoms.includes(
        symptom
      )

        ? 1

        : 0

  );

};

// =========================
// SAFE COMBINATIONS
// =========================

const generateCombinations = (
  disease
) => {

  const combinations = [];

  const primary =
    disease.primarySymptoms || [];

  const secondary =
    disease.secondarySymptoms || [];

  const signature =
    disease.signatureSymptoms || [];

  // =====================
  // FULL DISEASE
  // =====================

  combinations.push([

    ...primary,

    ...secondary,

    ...signature

  ]);

  // =====================
  // REMOVE SECONDARY ONLY
  // =====================

  for (
    let i = 0;
    i < secondary.length;
    i++
  ) {

    const reduced = [

      ...primary,

      ...signature,

      ...secondary.filter(
        (_, index) =>
          index !== i
      )

    ];

    combinations.push(
      reduced
    );

  }

  // =====================
  // PRIMARY + SIGNATURE
  // =====================

  combinations.push([

    ...primary,

    ...signature

  ]);

  return combinations;

};

// =========================
// GENERATE DATA
// =========================

diseases.forEach(
  (disease) => {

    const combinations =

      generateCombinations(
        disease
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

// =========================
// SAVE
// =========================

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
