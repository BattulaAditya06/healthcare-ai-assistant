const { exec } =
require("child_process");

const {
  encodeSymptoms
} = require(
  "../encoders/symptomEncoder"
);

const predictDisease =
(symptoms) => {

  return new Promise(
    (resolve, reject) => {

      try {

        // Convert symptoms to ML vector
        const vector =
          encodeSymptoms(
            symptoms
          );

        // Python command
        const command =
`python src/ml/python/predict.py "${JSON.stringify(vector)}"`;

        exec(

          command,

          (error, stdout, stderr) => {

            // Handle execution errors
            if (error) {

              console.error(
                "ML Prediction Error:",
                error.message
              );

              reject(error);

              return;

            }

            // Handle Python stderr
            if (stderr) {

              console.error(
                "Python STDERR:",
                stderr
              );

            }

            try {

              // Parse Python JSON output
              const result =
                JSON.parse(
                  stdout.trim()
                );

              resolve([result]);

            } catch (parseError) {

              console.error(
                "JSON Parse Error:",
                parseError.message
              );

              reject(parseError);

            }

          }

        );

      } catch (error) {

        reject(error);

      }

    }

  );

};

module.exports =
predictDisease;