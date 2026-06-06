console.log(
  "NEW NLP SERVICE RUNNING"
);

// =========================
// MASTER SYMPTOMS
// =========================

const masterSymptoms =
require(
  "../ml/datasets/masterSymptoms.json"
);

// =========================
// PROCESS SYMPTOMS
// =========================

const processSymptoms = (

  message = "",

  symptoms = []

) => {

  // =====================
  // NORMALIZE MESSAGE
  // =====================

  const normalizedMessage =

    String(message)
      .toLowerCase()
      .trim();

  console.log(
    "MESSAGE RECEIVED:",
    normalizedMessage
  );

  // =====================
  // FRESH EXTRACTION
  // =====================

  const extractedSymptoms =

    masterSymptoms.filter(

      (symptom) =>

        normalizedMessage.includes(

          symptom.toLowerCase()

        )

    );

  // =====================
  // REMOVE DUPLICATES
  // =====================

  const uniqueSymptoms = [

    ...new Set(
      extractedSymptoms
    )

  ];

  console.log(
    "EXTRACTED:",
    uniqueSymptoms
  );

  // =====================
  // SEVERITY
  // =====================

  let severity = "low";

  if (

    normalizedMessage.includes(
      "severe"
    ) ||

    normalizedMessage.includes(
      "extreme"
    ) ||

    normalizedMessage.includes(
      "unbearable"
    )

  ) {

    severity = "high";

  }

  // =====================
  // TEMPORAL STATUS
  // =====================

  let temporalStatus =
    "active";

  if (

    normalizedMessage.includes(
      "had"
    ) ||

    normalizedMessage.includes(
      "before"
    ) ||

    normalizedMessage.includes(
      "previously"
    )

  ) {

    temporalStatus =
      "past";

  }

  if (

    normalizedMessage.includes(
      "recovered"
    ) ||

    normalizedMessage.includes(
      "resolved"
    ) ||

    normalizedMessage.includes(
      "gone now"
    )

  ) {

    temporalStatus =
      "resolved";

  }

  // =====================
  // RETURN
  // =====================

  return {

    symptoms:
      uniqueSymptoms,

    severity,

    temporalStatus

  };

};

// =========================
// EXPORT
// =========================

module.exports = {
  processSymptoms
};