const calculateEmergency = (
  symptoms,
  severity
) => {

  let emergencyScore = 0;

  if (severity === "severe") {
    emergencyScore += 3;
  }

  if (severity === "moderate") {
    emergencyScore += 1;
  }

  symptoms.forEach((symptom) => {

    if (symptom === "chest pain") {
      emergencyScore += 5;
    }

    if (symptom === "breathing difficulty") {
      emergencyScore += 4;
    }

    if (symptom === "unconsciousness") {
      emergencyScore += 10;
    }

    if (symptom === "seizure") {
      emergencyScore += 8;
    }

  });

  let emergencyMessage = null;

  if (emergencyScore >= 8) {

    emergencyMessage =
      "Critical condition. Seek immediate medical attention.";

  } else if (emergencyScore >= 4) {

    emergencyMessage =
      "Symptoms may require urgent medical consultation.";

  }

  return emergencyMessage;
};

module.exports = {
  calculateEmergency
};