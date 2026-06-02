const stringSimilarity =
  require("string-similarity");
const symptomDictionary = {

  fever: [
    "temperature",
    "high temperature",
    "body heat",
    "feverish"
  ],

  cough: [
    "coughing",
    "dry cough",
    "wet cough"
  ],

  fatigue: [
    "tired",
    "weakness",
    "exhausted",
    "drained",
    "low energy"
  ],

  "breathing difficulty": [
    "shortness of breath",
    "breathlessness",
    "difficulty breathing",
    "hard to breathe"
  ],

  "chest pain": [
    "chest tightness",
    "chest pressure",
    "tight chest"
  ],

  headache: [
    "head pain",
    "migraine"
  ],

  vomiting: [
    "throwing up",
    "nausea",
    "vomit"
  ],

  "sore throat": [
    "throat pain",
    "itchy throat"
  ],

  dizziness: [
    "lightheaded",
    "head spinning"
  ],

  diarrhea: [
    "loose motions",
    "watery stool"
  ],

  chills: [
    "shivering",
    "cold feeling"
  ],

  sweating: [
    "night sweats",
    "body sweating"
  ],

  seizure: [
    "fits",
    "convulsions"
  ],

  unconsciousness: [
    "fainted",
    "passed out"
  ],

  "stomach pain": [
    "abdominal pain",
    "stomach ache",
    "belly pain"
  ],

  "body pain": [
    "muscle pain",
    "joint pain",
    "body ache"
  ],

  cold: [
    "runny nose",
    "blocked nose",
    "sneezing"
  ]
};

const nonMedicalContexts = [
  "gym",
  "workout",
  "exercise",
  "weight lifting",
  "running",
  "sports injury",
  "muscle soreness",
  "after exercise"
];

const contextRules = [

  {
    keywords: [
      "gym",
      "workout",
      "exercise",
      "weight lifting",
      "running"
    ],

    suppressSymptoms: [
      "chest pain",
      "body pain",
      "fatigue"
    ]
  },

  {
    keywords: [
      "exam",
      "stress",
      "anxiety",
      "tension"
    ],

    suppressSymptoms: [
      "headache",
      "fatigue"
    ]
  },

  {
    keywords: [
      "travel",
      "journey",
      "trip"
    ],

    suppressSymptoms: [
      "fatigue",
      "body pain"
    ]
  },

  {
    keywords: [
      "spicy food",
      "junk food",
      "outside food"
    ],

    suppressSymptoms: [
      "stomach pain",
      "vomiting"
    ]
  },

  {
    keywords: [
      "smoking",
      "cigarette"
    ],

    suppressSymptoms: [
      "cough",
      "breathing difficulty"
    ]
  },

  {
    keywords: [
      "drinking",
      "alcohol"
    ],

    suppressSymptoms: [
      "vomiting",
      "dizziness"
    ]
  }
];

const negationWords = [
  "no",
  "not",
  "don't",
  "do not",
  "never",
  "without",
  "none"
];

const hasNegationNearSymptom =
  (text, phrase) => {

    const words =
      text.split(" ");

    const phraseWords =
      phrase.split(" ");

    for (
      let i = 0;
      i < words.length;
      i++
    ) {

      const currentWord =
        words[i];

      const nearbyText =
        words
          .slice(i, i + 4)
          .join(" ");

      const hasPhrase =
        nearbyText.includes(
          phrase
        );

      if (
        negationWords.includes(
          currentWord
        ) &&
        hasPhrase
      ) {

        return true;
      }
    }

    return false;
};

const severityWords = {

  mild: [
    "mild",
    "slight",
    "little"
  ],

  moderate: [
    "persistent",
    "continuous",
    "constant"
  ],

  severe: [
    "severe",
    "extreme",
    "intense",
    "unbearable",
    "serious"
  ]
};

const detectSeverity =
  (text) => {

    for (
      const [level, words]
      of Object.entries(
        severityWords
      )
    ) {

      for (
        const word of words
      ) {

        if (
          text.includes(word)
        ) {

          return level;
        }
      }
    }

    return "normal";
};

const pastIndicators = [
  "had",
  "previously",
  "last week",
  "last month",
  "before",
  "earlier",
  "used to"
];

const resolvedIndicators = [
  "gone",
  "recovered",
  "better now",
  "not anymore",
  "resolved"
];

const chronicIndicators = [
  "since",
  "for",
  "weeks",
  "months",
  "years"
];

const detectTemporalContext =
  (text) => {

    const lower =
      text.toLowerCase();

    if (
      resolvedIndicators.some(
        (word) =>
          lower.includes(word)
      )
    ) {

      return "resolved";
    }

    if (
      pastIndicators.some(
        (word) =>
          lower.includes(word)
      )
    ) {

      return "past";
    }

    if (
      chronicIndicators.some(
        (word) =>
          lower.includes(word)
      )
    ) {

      return "chronic";
    }

    return "active";
};

const extractSymptomsLocally =
  (message) => {

    const text =
      message.toLowerCase();

const suppressedSymptoms =
  new Set();

contextRules.forEach(
  (rule) => {

    const matched =
      rule.keywords.some(
        (keyword) =>
          text.includes(keyword)
      );

    if (matched) {

      rule.suppressSymptoms.forEach(
        (symptom) =>
          suppressedSymptoms.add(
            symptom
          )
      );
    }
  }
);

    const extracted = [];

    const words =
      text.split(" ");

    Object.entries(
      symptomDictionary
    ).forEach(
      ([symptom, synonyms]) => {

        // direct symptom match
        if (
  text.includes(symptom) &&
  !hasNegationNearSymptom(
    text,
    symptom
  )
)
{

          if (
  !suppressedSymptoms.has(
    symptom
  )
) {

  extracted.push(symptom);
}
        }

        synonyms.forEach(
          (phrase) => {

            // direct phrase match
            if (
  text.includes(phrase) &&
  !hasNegationNearSymptom(
    text,
    phrase
  )
)
{

              extracted.push(
                symptom
              );
            }

            // fuzzy word matching
            words.forEach(
              (word) => {

                const similarity =
                  stringSimilarity.compareTwoStrings(
                    word,
                    phrase
                  );

                if (
                  similarity >= 0.8
                ) {

                  extracted.push(
                    symptom
                  );
                }
              }
            );
          }
        );
      }
    );

const temporalStatus =
  detectTemporalContext(
    text
  );

return {

  symptoms:
    [...new Set(extracted)],

  severity:
    detectSeverity(text),

  temporalStatus
};

    return {
  symptoms:
    [...new Set(extracted)],

  severity:
    detectSeverity(text)
};
};

module.exports = {
  extractSymptomsLocally
};