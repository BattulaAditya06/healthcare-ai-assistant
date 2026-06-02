const {
  extractSymptomsLocally
} = require("./localNlpService");

const normalizeSymptoms =
require("../utils/normalizeSymptoms");

const processSymptoms = (
  message,
  symptoms
) => {

  let severity = "normal";

  let temporalStatus = "active";

  if (
    message &&
    typeof message === "string"
  ) {

    const nlpResult =
      extractSymptomsLocally(message);

    symptoms =
      nlpResult.symptoms;

    severity =
      nlpResult.severity;

    temporalStatus =
      nlpResult.temporalStatus;
  }

  symptoms = normalizeSymptoms(
    symptoms || []
  );

  return {
    symptoms,
    severity,
    temporalStatus
  };
};

module.exports = {
  processSymptoms
};