const CRITICAL_RULES = [
  {
    symptoms: [
      "chest pain",
      "shortness of breath"
    ],
    severity: "critical",
    emergency: true,
    reason: "Possible heart attack",
    action:
      "Seek immediate emergency medical care",
  },

  {
    symptoms: [
      "slurred speech",
      "weakness",
      "blurred vision"
    ],
    severity: "critical",
    emergency: true,
    reason: "Possible stroke",
    action:
      "Call emergency services immediately",
  },

  {
    symptoms: [
      "high fever",
      "stiff neck",
      "confusion"
    ],
    severity: "critical",
    emergency: true,
    reason: "Possible meningitis",
    action:
      "Immediate hospitalization required",
  },

  {
    symptoms: [
      "difficulty breathing"
    ],
    severity: "high",
    emergency: true,
    reason: "Respiratory distress",
    action:
      "Urgent medical attention required",
  },

  {
    symptoms: [
      "loss of consciousness"
    ],
    severity: "critical",
    emergency: true,
    reason: "Loss of consciousness detected",
    action:
      "Call ambulance immediately",
  },

  {
    symptoms: [
      "seizure"
    ],
    severity: "critical",
    emergency: true,
    reason: "Neurological emergency",
    action:
      "Emergency medical intervention needed",
  }
];

function normalizeSymptoms(symptoms = []) {
  return symptoms.map((s) =>
    s.toLowerCase().trim()
  );
}

function detectEmergency(symptoms = []) {
  const normalized =
    normalizeSymptoms(symptoms);

  for (const rule of CRITICAL_RULES) {
    const matchedSymptoms =
      rule.symptoms.filter((symptom) =>
        normalized.includes(symptom)
      );

    const allMatched =
      matchedSymptoms.length ===
      rule.symptoms.length;

    if (allMatched) {
      return {
        emergency: true,
        severity: rule.severity,
        reason: rule.reason,
        action: rule.action,
        matchedSymptoms,
        confidence: 95,
        priority: "immediate",
        ambulanceRequired:
          rule.severity === "critical",
      };
    }
  }

  return {
    emergency: false,
    severity: "low",
    reason: null,
    action:
      "Monitor symptoms and consult doctor if symptoms worsen",
    matchedSymptoms: [],
    confidence: 15,
    priority: "normal",
    ambulanceRequired: false,
  };
}

module.exports = detectEmergency;