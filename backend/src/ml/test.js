const generateTrainingData =
require("./training/generateTrainingData");

const data =
generateTrainingData();

console.log(
  "Training Samples:",
  data.length
);

console.log(data.slice(0, 5));