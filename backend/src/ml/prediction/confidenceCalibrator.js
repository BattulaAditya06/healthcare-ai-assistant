
const calibrateConfidence =
(
  predictions = [],

  symptomCount = 0
) => {

  return predictions.map(
    (prediction) => {

      let confidence =
        prediction.confidence;

      // =====================
      // LOW SYMPTOM PENALTY
      // =====================

      if (
        symptomCount <= 1
      ) {

        confidence *= 0.55;

      }

      else if (
        symptomCount === 2
      ) {

        confidence *= 0.75;

      }

      // =====================
      // HIGH CONFIDENCE BOOST
      // =====================

      if (
        confidence >= 60
      ) {

        confidence *= 1.08;

      }

      // =====================
      // EMERGENCY BOOST
      // =====================

      if (
        prediction.emergencyMatch
      ) {

        confidence += 8;

      }

      // =====================
      // SIGNATURE BOOST
      // =====================

      const matchedSymptoms =
        prediction.matchedSymptoms || [];

      const hasSignature =

        matchedSymptoms.includes(
          "loss of taste"
        ) ||

        matchedSymptoms.includes(
          "loss of smell"
        );

      if (hasSignature) {

        confidence += 18;

      }

      // =====================
      // NORMALIZATION
      // =====================

      confidence =
        Math.min(
          confidence,
          95
        );

      confidence =
        Math.max(
          confidence,
          5
        );

      return {

        ...prediction,

        confidence:
          Number(
            confidence.toFixed(1)
          )

      };

    }

  )

  .sort(
    (a, b) =>

      b.confidence -
      a.confidence
  );

};

module.exports =
  calibrateConfidence;
