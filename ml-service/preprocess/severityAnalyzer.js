const severityAnalyzer =
(text = "") => {

  const message =
    text.toLowerCase();

  let score = 1;

  const severeWords = [

    "severe",
    "extreme",
    "unbearable",
    "intense",
    "worst"

  ];

  severeWords.forEach(
    word => {

      if (
        message.includes(word)
      ) {

        score += 3;

      }

    }
  );

  if (
    message.includes(
      "high fever"
    )
  ) {

    score += 3;

  }

  return {

    score,

    level:

      score >= 5

        ? "high"

        : score >= 3

        ? "medium"

        : "low"

  };

};

module.exports =
  severityAnalyzer;