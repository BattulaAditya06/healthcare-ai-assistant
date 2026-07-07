// =========================
// DISEASE DATASET
// =========================

const diseases = require(
  "../ml/datasets/diseases.json"
);

// =========================
// WEIGHT CONFIGURATION
// =========================

const WEIGHTS = {

  // =========================
// CRITICAL DISEASE PRIORITY
// =========================

const CRITICAL_DISEASES = {

  "Heart Attack": {
    bonus: 120,
    symptoms: [
      "chest pain",
      "shortness of breath"
    ]
  },

  "Pulmonary Embolism": {
    bonus: 110,
    symptoms: [
      "chest pain",
      "shortness of breath"
    ]
  },

  "Aortic Dissection": {
    bonus: 130,
    symptoms: [
      "chest pain"
    ]
  },

  "Stroke": {
    bonus: 120,
    symptoms: [
      "slurred speech",
      "weakness"
    ]
  }

};

  primary: 30,

  secondary: 10,

  signature: 50,

  emergency: 80,

  combination: 35,

  negative: -35,

  diseaseCoverage: 30,

  symptomCoverage: 25,

  primaryBonus: 8,

  signatureBonus: 10,

  noPrimaryPenalty: -20

};

// =========================
// SAFE ARRAY
// =========================

const safeArray = (value) =>

  Array.isArray(value)

    ? value

    : [];

// =========================
// UNIQUE ARRAY
// =========================

const unique = (arr) =>

  [...new Set(arr)];

// =========================
// CHECK COMBINATION
// =========================

const hasCombination = (

  symptoms,

  combination

) => {

  return combination.every(

    symptom =>

      symptoms.includes(symptom)

  );

};

// =========================
// ROUND NUMBER
// =========================

const round = (value) =>

  Number(value.toFixed(2));

// =========================
// PREDICTION ENGINE
// =========================

const predictionService = (

  symptoms = []

) => {

  if (

    !Array.isArray(symptoms) ||

    symptoms.length === 0

  ) {

    return [];

  }

  console.log(

    "INPUT SYMPTOMS:",

    symptoms

  );

  const predictions =

    diseases.map (

      (diseaseData) => {

        // =====================
        // INITIALIZE
        // =====================

      

        let emergencyMatch = false;

        let score = 0;

let primaryMatches = 0;

let secondaryMatches = 0;

let signatureMatches = 0;

let emergencyMatches = 0;

        

        const matchedSymptoms = [];

        // =====================
        // DISEASE ARRAYS
        // =====================

        const primarySymptoms =

          safeArray(

            diseaseData.primarySymptoms

          );
        

        const secondarySymptoms =

          safeArray(

            diseaseData.secondarySymptoms

          );

        const signatureSymptoms =

          safeArray(

            diseaseData.signatureSymptoms

          );

        const emergencySymptoms =

          safeArray(

            diseaseData.emergencySymptoms

          );

        const negativeSymptoms =

          safeArray(

            diseaseData.negativeSymptoms

          );

        const combinations =

          safeArray(

            diseaseData.symptomCombinations

          );
        // =====================
        // PRIMARY SYMPTOMS
        // =====================

        primarySymptoms.forEach((symptom) => {

          if (symptoms.includes(symptom)) {

            primaryMatches++;

            score += WEIGHTS.primary;

            matchedSymptoms.push(symptom);

          }

        });

        // =====================
        // SECONDARY SYMPTOMS
        // =====================

        secondarySymptoms.forEach((symptom) => {

          if (symptoms.includes(symptom)) {

            secondaryMatches++;

            score += WEIGHTS.secondary;

            matchedSymptoms.push(symptom);

          }

        });

        // =====================
        // SIGNATURE SYMPTOMS
        // =====================

        signatureSymptoms.forEach((symptom) => {

          if (symptoms.includes(symptom)) {

            signatureMatches++;

            score += WEIGHTS.signature;

            matchedSymptoms.push(symptom);

          }

        });

        // =====================
        // EMERGENCY SYMPTOMS
        // =====================

        emergencySymptoms.forEach((symptom) => {

          if (symptoms.includes(symptom)) {

            emergencyMatches++;

            emergencyMatch = true;

            score += WEIGHTS.emergency;

            matchedSymptoms.push(symptom);

          }

        });

        // =====================
        // NEGATIVE SYMPTOMS
        // =====================

        negativeSymptoms.forEach((symptom) => {

          if (symptoms.includes(symptom)) {

            score += WEIGHTS.negative;

          }

        });

        // =====================
        // SYMPTOM COMBINATIONS
        // =====================

        combinations.forEach((combination) => {

          if (

            Array.isArray(combination) &&

            hasCombination(symptoms, combination)

          ) {

            score += WEIGHTS.combination;

          }

        });

        // =====================
        // REMOVE DUPLICATES
        // =====================

        const uniqueMatches = unique(

          matchedSymptoms

        );
        // =====================
// MINIMUM MATCH CHECK
// =====================

const minimumMatches =

  symptoms.length <= 2

    ? symptoms.length

    : Math.ceil(

        symptoms.length * 0.6

      );

if (

  uniqueMatches.length <

  minimumMatches

) {

  return null;

}

        // =====================
        // SKIP IF NOTHING MATCHED
        // =====================

        if (

          uniqueMatches.length === 0

        ) {

          return null;

        }

        // =====================
        // DISEASE PROFILE
        // =====================

        const diseaseProfile = [

          ...primarySymptoms,

          ...secondarySymptoms,

          ...signatureSymptoms,

          ...emergencySymptoms

        ];

        const totalDiseaseSymptoms =

          diseaseProfile.length;

        // =====================
        // COVERAGE SCORES
        // =====================

        const diseaseCoverage =

          totalDiseaseSymptoms > 0

            ? uniqueMatches.length /

              totalDiseaseSymptoms

            : 0;

        const symptomCoverage =

          symptoms.length > 0

            ? uniqueMatches.length /

              symptoms.length

            : 0;
                    // =====================
        // BASE CONFIDENCE
        // =====================

        let confidence = score;

        // =====================
        // DISEASE COVERAGE BONUS
        // =====================

        confidence +=

          diseaseCoverage *

          WEIGHTS.diseaseCoverage;

        // =====================
        // USER SYMPTOM COVERAGE BONUS
        // =====================

        confidence +=

          symptomCoverage *

          WEIGHTS.symptomCoverage;
          // =====================
// HIGH COVERAGE BONUS
// =====================

if (

  diseaseCoverage >= 0.75

) {

  confidence += 10;

}

if (

  symptomCoverage >= 0.80

) {

  confidence += 10;

}

        // =====================
        // PRIMARY MATCH BONUS
        // =====================

        confidence +=

          primaryMatches *

          WEIGHTS.primaryBonus;

        // =====================
        // SIGNATURE BONUS
        // =====================

        confidence +=

          signatureMatches *

          WEIGHTS.signatureBonus;

        // =====================
        // PENALTY:
        // NO PRIMARY MATCH
        // =====================

        if (

          primaryMatches === 0

        ) {

          confidence +=

            WEIGHTS.noPrimaryPenalty;

        }

        // =====================
        // PENALTY:
        // TOO MANY USER SYMPTOMS
        // NOT EXPLAINED
        // =====================

        const unexplainedSymptoms =

          symptoms.length -

          uniqueMatches.length;

        if (

          unexplainedSymptoms >= 3

        ) {

          confidence -=

            unexplainedSymptoms * 5;

        }

        // =====================
        // PENALTY:
        // LOW DISEASE COVERAGE
        // =====================

        if (

          diseaseCoverage < 0.30

        ) {

          confidence -= 10;

        }

        // =====================
        // EMERGENCY BOOST
        // =====================

        if (

          emergencyMatch

        ) {

          confidence += 10;

        }

        // =====================
        // CLAMP SCORE
        // =====================

        confidence = Math.max(

          5,

          Math.min(

            99,

            round(confidence)

          )

        );

        // =====================
        // REMOVE VERY WEAK MATCHES
        // =====================

        if (

          confidence < 15

        ) {

          return null;

        }

        // =====================
        // FORCE EMERGENCY CONFIDENCE
        // =====================

        if (

          emergencyMatch &&

          confidence < 85

        ) {

          confidence = 85;

        }

        // =====================
        // RELIABILITY SCORE
        // =====================

        let reliability =

          symptomCoverage * 100;

        if (

          primaryMatches === 0

        ) {

          reliability -= 20;

        }

        reliability =

          Math.max(

            0,

            Math.min(

              100,

              round(reliability)

            )

          );
        // =====================
        // BUILD PREDICTION
        // =====================

        return {

          disease:
            diseaseData.disease,

          category:
            diseaseData.category ||

            "General",

          confidence,

          department:
            diseaseData.department ||

            "General Medicine",

          riskLevel:
            diseaseData.riskLevel ||

            "Low",

          severityScore:
            diseaseData.severityScore ||

            0,

          emergencyMatch,

          matchedSymptoms:
            uniqueMatches,

          recommendations:

            diseaseData.recommendations ||

            [],

          scoreBreakdown: {

            totalScore:
              round(score),

            primaryMatches,

            secondaryMatches,

            signatureMatches,

            emergencyMatches,

            diseaseCoverage:

              round(

                diseaseCoverage * 100

              ),

            symptomCoverage:

              round(

                symptomCoverage * 100

              ),

            reliability

          },

          predictionType:

            "Rule Based Prediction"

        };

      })

      // =====================
      // REMOVE NULLS
      // =====================

      .filter(Boolean)

      // =====================
      // FINAL SORTING
      // =====================

      .sort((a, b) => {

        // Emergency diseases first

        if (

          a.emergencyMatch &&

          !b.emergencyMatch

        ) {

          return -1;

        }

        if (

          !a.emergencyMatch &&

          b.emergencyMatch

        ) {

          return 1;

        }

        // Higher confidence

        if (

          b.confidence !==

          a.confidence

        ) {

          return (

            b.confidence -

            a.confidence

          );

        }

        // Better reliability

        if (

          b.scoreBreakdown.reliability !==

          a.scoreBreakdown.reliability

        ) {

          return (

            b.scoreBreakdown.reliability -

            a.scoreBreakdown.reliability

          );

        }

        // Better disease coverage

        return (

          b.scoreBreakdown.diseaseCoverage -

          a.scoreBreakdown.diseaseCoverage

        );

      })

      // =====================
      // LIMIT RESULTS
      // =====================

      .slice(0, 5);

  console.log(

    "RULE PREDICTIONS:",

    predictions

  );

  return predictions;

};

// =========================
// EXPORT
// =========================

module.exports =
  predictionService;