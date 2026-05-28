const masterSymptoms =
require("../datasets/masterSymptoms.json");

const symptomSynonyms =
require("../datasets/symptomSynonyms.json");

const stopWords =
require(
  "../datasets/stopWords.json"
);

const fuzzyBlockedWords =
require(
  "../datasets/fuzzyBlockedWords.json"
);

const fuzzyMatchSymptom =
require(
  "../utils/fuzzyMatcher"
);

const normalizeSymptoms =
require(
  "../utils/symptomNormalizer"
);

const isNegated =
require(
  "./negationDetector"
);

const extractSymptoms =
(text = "") => {

  // NORMALIZE INPUT
  const normalizedText =
    text.toLowerCase();

  let detectedSymptoms = [];

  // TOKENIZE WORDS
  const words =
    normalizedText
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

  // CREATE BIGRAM PHRASES
  const phrases = [];

  for (
    let i = 0;
    i < words.length - 1;
    i++
  ) {

    phrases.push(

      words[i] +
      " " +
      words[i + 1]

    );

  }

  // STEP 1 — DIRECT SYMPTOM MATCH
  masterSymptoms.forEach(
    (symptom) => {

      // NEGATION CHECK
      if (
        isNegated(
          normalizedText,
          symptom
        )
      ) {

        return;

      }

      // DIRECT MATCH
      if (
        normalizedText.includes(
          symptom.toLowerCase()
        )
      ) {

        detectedSymptoms.push(
          symptom
        );

      }

    }
  );

  // STEP 2 — SYNONYM MATCH
  Object.keys(
    symptomSynonyms
  ).forEach((synonym) => {

    const mappedSymptom =
      symptomSynonyms[synonym];

    // NEGATION CHECK
    if (
      isNegated(
        normalizedText,
        synonym
      )
    ) {

      return;

    }

    // SYNONYM MATCH
    if (
      normalizedText.includes(
        synonym.toLowerCase()
      )
    ) {

      detectedSymptoms.push(
        mappedSymptom
      );

    }

  });

// STEP 3 — EXACT PHRASE MATCH
phrases.forEach((phrase) => {

  if (
    masterSymptoms.includes(
      phrase
    )
  ) {

    if (
      !detectedSymptoms.includes(
        phrase
      )
    ) {

      detectedSymptoms.push(
        phrase
      );

    }

  }

});

  // STEP 4— FUZZY MATCHING
  words.forEach((word) => {

    // SKIP STOPWORDS
    if (

      stopWords.includes(word) ||

      fuzzyBlockedWords.includes(
        word
      )

    ) {

      return;

    }

    // SKIP SHORT WORDS
    if (
      word.length < 4
    ) {

      return;

    }

    const matched =
      fuzzyMatchSymptom(
        word
      );

    if (
      matched &&
      !detectedSymptoms.includes(
        matched
      )
    ) {

      detectedSymptoms.push(
        matched
      );

    }

  });

  // STEP 4 — NORMALIZE
  detectedSymptoms =
    normalizeSymptoms(
      detectedSymptoms
    );

  // STEP 5 — REMOVE DUPLICATES
  return [

    ...new Set(
      detectedSymptoms
    )

  ];

};

module.exports =
extractSymptoms;