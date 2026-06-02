const calibrateConfidence =
(
  predictions,
  symptomCount
) => {

  return predictions.map(
    (prediction) => {

      let multiplier = 1;

      if (
        symptomCount <= 1
      ) {

        multiplier = 0.35;

      }

      else if (
        symptomCount === 2
      ) {

        multiplier = 0.55;

      }

      else if (
        symptomCount === 3
      ) {

        multiplier = 0.75;

      }

      else {

        multiplier = 1;

      }

      const calibrated =
        prediction.confidence *
        multiplier;

      return {

        ...prediction,

        confidence:
          Number(

            calibrated.toFixed(
              1
            )

          )

      };

    }
  );

};

module.exports =
  calibrateConfidence;