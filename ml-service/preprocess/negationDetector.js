const negationWords = [

  "no",
  "not",
  "don't",
  "do not",
  "without",
  "never"

];

const isNegated =
(text, symptom) => {

  const lowerText =
    text.toLowerCase();

  return negationWords.some(
    (word) => {

      return (

        lowerText.includes(
          `${word} ${symptom}`
        ) ||

        lowerText.includes(
          `${word} have ${symptom}`
        ) ||

        lowerText.includes(
          `${word} having ${symptom}`
        ) ||

        lowerText.includes(
          `${word} got ${symptom}`
        )

      );

    }
  );

};

module.exports =
isNegated;