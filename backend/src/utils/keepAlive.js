const axios = require("axios");

setInterval(async () => {
  try {
    await axios.get(
      process.env.ML_SERVICE_URL
    );

    console.log(
      "ML SERVICE PINGED"
    );
  } catch (err) {
    console.log(
      "ML SERVICE PING FAILED"
    );
  }
}, 5 * 60 * 1000);