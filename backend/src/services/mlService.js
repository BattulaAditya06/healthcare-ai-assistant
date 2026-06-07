const axios = require("axios");

const predictDisease = async (symptoms) => {

  try {

    console.log(
      "===== ML MICROSERVICE ACTIVE ====="
    );

    console.log(
      "CALLING ML SERVICE:",
      process.env.ML_SERVICE_URL
    );

    const response = await axios.post(

      `${process.env.ML_SERVICE_URL}/predict`,

      {
        symptoms
      },

      {
        timeout: 30000
      }

    );

    console.log(
      "ML RESPONSE:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "ML SERVICE ERROR:",
      error.message
    );

    if (error.response) {

      console.error(
        "ML ERROR RESPONSE:",
        error.response.data
      );

    }

    return [];

  }

};

module.exports = {
  predictDisease
};