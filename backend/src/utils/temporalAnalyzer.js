const temporalAnalyzer = (text = "") => {

  const message =
    text.toLowerCase();

  let duration = null;

  if (
    message.match(
      /(\d+)\s*day/
    )
  ) {

    duration =
      parseInt(
        message.match(
          /(\d+)\s*day/
        )[1]
      );

  }

  if (
    message.includes(
      "today"
    )
  ) {

    duration = 1;

  }

  if (
    message.includes(
      "yesterday"
    )
  ) {

    duration = 2;

  }

  if (
    message.includes(
      "week"
    )
  ) {

    duration = 7;

  }

  return {

    durationDays:
      duration,

    chronic:
      duration >= 14

  };

};

module.exports =
  temporalAnalyzer;