const hybridPredictor =
require("../ml/prediction/hybridPredictor");

const predictDiseases =
async (symptoms) => {

  const predictions =
    await hybridPredictor(
      symptoms
    );

  return predictions;

};

module.exports = {
  predictDiseases
};