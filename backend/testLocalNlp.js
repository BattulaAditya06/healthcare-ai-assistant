const {
  extractSymptomsLocally
} = require(
  "./src/services/localNlpService"
);

const result =
  extractSymptomsLocally(
    "I feel exhausted and have chest tightness"
  );

console.log(result);