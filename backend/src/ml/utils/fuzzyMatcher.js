const stringSimilarity =
require(
  "string-similarity"
);

const masterSymptoms =
require(
  "../datasets/masterSymptoms.json"
);

const fuzzyMatchSymptom =
(symptom) => {

  const matches =
    stringSimilarity.findBestMatch(

      symptom,

      masterSymptoms

    );

  const bestMatch =
    matches.bestMatch;

  console.log(
    symptom,
    "→",
    bestMatch.target,
    bestMatch.rating
  );

  // LOWER THRESHOLD
  if (
    bestMatch.rating >= 0.5
  ) {

    return bestMatch.target;

  }

  return null;

};

module.exports =
fuzzyMatchSymptom;