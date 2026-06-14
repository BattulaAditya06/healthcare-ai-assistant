const axios = require("axios");
const cache = require("./predictionCache");

const predictDisease = async (symptoms = []) => {

  const key =
    [...symptoms]
      .sort()
      .join(",");

  const cached =
    cache.get(key);

  if (cached) {

    console.log("CACHE HIT");

    return cached;

  }

  try {

    console.time("ML_REQUEST");

    const response =
      await axios.post(

        `${process.env.ML_SERVICE_URL}/predict`,

        { symptoms },

        {
          timeout: 30000
        }

      );

    console.timeEnd("ML_REQUEST");

    cache.set(
      key,
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "ML SERVICE ERROR:",
      error.message
    );

    return [
      {
        disease:
          "Prediction Service Unavailable",
        confidence: 0,
        riskLevel: "unknown",
        department:
          "General Medicine"
      }
    ];

  }

};

module.exports = {
  predictDisease
};