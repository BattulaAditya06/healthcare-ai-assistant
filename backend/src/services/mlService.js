const axios =
  require("axios");

const cache =
  require("./predictionCache");

const predictDisease =
async (symptoms = []) => {

  const key =
    symptoms
      .sort()
      .join(",");

  const cached =
    cache.get(key);

  if (cached) {

    console.log(
      "CACHE HIT"
    );

    return cached;

  }

  const response =
    await axios.post(

      process.env.ML_SERVICE_URL +
      "/predict",

      { symptoms },

      {
        timeout: 5000
      }

    );

  cache.set(
    key,
    response.data
  );

  return response.data;
};

module.exports = {
  predictDisease
};