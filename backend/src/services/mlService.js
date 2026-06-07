const axios = require("axios");

const predictDisease = async (symptoms) => {

  try {

    const response = await axios.post(
      `${process.env.ML_SERVICE_URL}/predict`,
      {
        symptoms
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "ML SERVICE ERROR:",
      error.message
    );

    return [];

  }

};

module.exports = {
  predictDisease
};