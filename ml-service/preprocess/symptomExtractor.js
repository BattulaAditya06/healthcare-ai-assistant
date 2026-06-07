
const stringSimilarity =
require(
  "string-similarity"
);

const masterSymptoms =
require(
  "../datasets/masterSymptoms.json"
);

const symptomSynonyms =
require(
  "../datasets/symptomSynonyms.json"
);

// =========================
// NEGATIVE WORDS
// =========================

const negativeWords = [

  "no",

  "not",

  "without",

  "dont",

  "don't",

  "denies"

];

// =========================
// NORMALIZE
// =========================

const normalize =
(text = "") => {

  return text

    .toLowerCase()

    .replace(/[^\w\s]/g, " ")

    .replace(/\s+/g, " ")

    .trim();

};

// =========================
// SAFE REGEX
// =========================

const safeMatch =
(
  text,
  phrase
) => {

  const escaped =
    phrase.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  return new RegExp(

    `\\b${escaped}\\b`

  ).test(text);

};

const canonicalMap = {

  "high temperature":
    "fever",

  "cold and cough":
    "cough"

};


// =========================
// EXTRACT SYMPTOMS
// =========================

const extractSymptoms =
(text = "") => {

  const normalizedText =
    normalize(text);

  const foundSymptoms =
    new Set();

  const negativeSymptoms =
    new Set();

  const tokens =
    normalizedText.split(" ");

  // =========================
  // DIRECT MATCH
  // =========================

  masterSymptoms.forEach(

    (symptom) => {

      const normalizedSymptom =
        normalize(symptom);

      if (

        safeMatch(

          normalizedText,

          normalizedSymptom

        )

      ) {

        foundSymptoms.add(
          symptom
        );

      }

    }

  );


// =========================
// MULTI-WORD PHRASE MATCHING
// =========================

masterSymptoms.forEach(

  (symptom) => {

    if (
      symptom.includes(" ")
    ) {

      const normalizedSymptom =
        normalize(symptom);

      // EXACT PHRASE
      if (

        normalizedText.includes(
          normalizedSymptom
        )

      ) {

        foundSymptoms.add(
          symptom
        );

      }

      // PARTIAL PHRASE LOGIC
      else {

        const symptomWords =
          normalizedSymptom.split(
            " "
          );

        const matchedWords =
          symptomWords.filter(

            (word) =>

              normalizedText.includes(
                word
              )

          );

        // MOST WORDS MATCHED
        if (

          matchedWords.length >=

          Math.ceil(
            symptomWords.length * 0.7
          )

        ) {

          foundSymptoms.add(
            symptom
          );

        }

      }

    }

  }

);

  // =========================
  // SYNONYM MATCH
  // =========================

  Object.entries(
    symptomSynonyms
  ).forEach(

    ([

      symptom,

      synonyms

    ]) => {

      const synonymList =

        Array.isArray(
          synonyms
        )

          ? synonyms

          : [synonyms];

      synonymList.forEach(

        (synonym) => {

          const normalizedSynonym =
            normalize(
              synonym
            );

          if (

            safeMatch(

              normalizedText,

              normalizedSynonym

            )

          ) {

            foundSymptoms.add(
              symptom
            );

          }

        }

      );

    }

  );

  // =========================
  // CONTEXTUAL PAIN MATCHING
  // =========================

  const hasPainWord =

    tokens.includes(
      "pain"
    ) ||

    tokens.includes(
      "paining"
    ) ||

    tokens.includes(
      "hurt"
    ) ||

    tokens.includes(
      "hurting"
    ) ||

    tokens.includes(
      "ache"
    ) ||

    tokens.includes(
      "aching"
    );

  // WRIST PAIN

  if (

    tokens.includes(
      "wrist"
    ) &&

    hasPainWord

  ) {

    foundSymptoms.add(
      "wrist pain"
    );

  }

  // JOINT PAIN

  if (

    tokens.includes(
      "joint"
    ) &&

    hasPainWord

  ) {

    foundSymptoms.add(
      "joint pain"
    );

  }

  // CHEST PAIN

  if (

    tokens.includes(
      "chest"
    ) &&

    hasPainWord

  ) {

    foundSymptoms.add(
      "chest pain"
    );

  }

  // BACK PAIN

  if (

    tokens.includes(
      "back"
    ) &&

    hasPainWord

  ) {

    foundSymptoms.add(
      "back pain"
    );

  }

  // MUSCLE PAIN

  if (

    tokens.includes(
      "muscle"
    ) &&

    hasPainWord

  ) {

    foundSymptoms.add(
      "muscle pain"
    );

  }

  // =========================
  // FUZZY TYPO MATCHING
  // =========================

  tokens.forEach((token) => {

    if (
      token.length < 4
    ) {

      return;

    }

    const matches =
      stringSimilarity.findBestMatch(

        token,

        masterSymptoms

      );

    const bestMatch =
      matches.bestMatch;

    if (

      bestMatch.rating >= 0.78

    ) {

      foundSymptoms.add(
        bestMatch.target
      );

    }

  });

  // =========================
  // NEGATIVE DETECTION
  // =========================

  tokens.forEach(
    (
      token,
      index
    ) => {

      if (
        negativeWords.includes(
          token
        )
      ) {

        const nextWord =
          tokens[index + 1];

        if (
          !nextWord
        ) {

          return;

        }

        const matches =
          stringSimilarity.findBestMatch(

            nextWord,

            masterSymptoms

          );

        const bestMatch =
          matches.bestMatch;

        if (

          bestMatch.rating >= 0.75

        ) {

          negativeSymptoms.add(

            bestMatch.target

          );

        }

      }

    }
  );

// =========================
// CANONICALIZATION
// =========================

const canonicalSymptoms =

  [...foundSymptoms].map(

    (symptom) =>

      canonicalMap[symptom] ||

      symptom

  );

// REMOVE DUPLICATES

const uniqueCanonicalSymptoms =

  [...new Set(
    canonicalSymptoms
  )];

// =========================
// RETURN
// =========================

return {

  symptoms:
    uniqueCanonicalSymptoms,

  negativeSymptoms:
    [...negativeSymptoms]

};


};

module.exports =
  extractSymptoms;
