const fs =
require("fs");

const path =
require("path");

const generateTrainingData =
require("./generateTrainingData");

const trainingData =
generateTrainingData();

const outputPath =
path.join(
  __dirname,
  "../datasets/trainingData.json"
);

fs.writeFileSync(
  outputPath,

  JSON.stringify(
    trainingData,
    null,
    2
  )
);

console.log(
  "Training data exported"
);