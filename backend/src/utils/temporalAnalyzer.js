const temporalAnalyzer = (text = "") => {
  const message = String(text).toLowerCase();

  let durationDays = null;

  // =========================
  // DAYS
  // =========================

  const dayMatch = message.match(
    /(\d+)\s*(day|days)\b/
  );

  if (dayMatch) {
    durationDays = parseInt(dayMatch[1], 10);
  }

  // =========================
  // WEEKS
  // =========================

  const weekMatch = message.match(
    /(\d+)\s*(week|weeks)\b/
  );

  if (weekMatch) {
    durationDays =
      parseInt(weekMatch[1], 10) * 7;
  }

  // =========================
  // MONTHS
  // =========================

  const monthMatch = message.match(
    /(\d+)\s*(month|months)\b/
  );

  if (monthMatch) {
    durationDays =
      parseInt(monthMatch[1], 10) * 30;
  }

  // =========================
  // YEARS
  // =========================

  const yearMatch = message.match(
    /(\d+)\s*(year|years)\b/
  );

  if (yearMatch) {
    durationDays =
      parseInt(yearMatch[1], 10) * 365;
  }

  // =========================
  // RELATIVE TIME
  // =========================

  if (message.includes("today")) {
    durationDays = 1;
  }

  if (message.includes("yesterday")) {
    durationDays = 2;
  }

  // =========================
  // CHRONIC STATUS
  // =========================

  const chronic =
    durationDays !== null &&
    durationDays >= 14;

  return {
    durationDays,
    chronic
  };
};

module.exports = temporalAnalyzer;