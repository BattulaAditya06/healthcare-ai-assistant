const severityAnalyzer =
(text = "") => {

  const message =
    String(text).toLowerCase();

  // =========================
  // BASE SCORE
  // =========================

  let score = 1;

  // =========================
  // SEVERITY KEYWORDS
  // =========================

  const severeWords = [

    "severe",
    "extreme",
    "unbearable",
    "intense",
    "worst",
    "critical"

  ];

  const moderateWords = [

    "moderate",
    "bad",
    "painful"

  ];

  // =========================
  // SEVERE
  // =========================

  if (
    severeWords.some(
      word =>
        message.includes(word)
    )
  ) {

    score = 8;

  }

  // =========================
  // MODERATE
  // =========================

  else if (
    moderateWords.some(
      word =>
        message.includes(word)
    )
  ) {

    score = 5;

  }

  // =========================
  // HIGH FEVER
  // =========================

  if (
    message.includes(
      "high fever"
    )
  ) {

    score = Math.max(
      score,
      8
    );

  }

  // =========================
  // RESULT
  // =========================

  return {

    score,

    level:

      score >= 8

        ? "high"

        : score >= 5

        ? "medium"

        : "low"

  };

};

module.exports =
  severityAnalyzer;