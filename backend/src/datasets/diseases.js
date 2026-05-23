const diseases = [
  {
    name: "Common Cold",

    symptoms: [
      "cough",
      "sore throat",
      "fatigue"
    ],

    riskLevel: "low",

    department: "General Medicine",

    recommendations: [
      "Drink warm fluids",
      "Take proper rest",
      "Monitor symptoms"
    ]
  },

  {
    name: "Flu",

    symptoms: [
      "fever",
      "cough",
      "headache",
      "fatigue"
    ],

    criticalSymptoms: [
  "fever",
  "cough"
],

    riskLevel: "medium",

    department: "General Medicine",

    recommendations: [
      "Stay hydrated",
      "Take rest",
      "Consult doctor if symptoms worsen"
    ]
  },

  {
    name: "Food Poisoning",

    symptoms: [
      "vomiting",
      "fever",
      "fatigue"
    ],

    riskLevel: "medium",

    department: "Gastroenterology",

    recommendations: [
      "Drink ORS",
      "Avoid oily foods",
      "Consult doctor if dehydration occurs"
    ]
  },

  {
    name: "Asthma",

    symptoms: [
      "cough",
      "breathing difficulty",
      "chest pain"
    ],

criticalSymptoms: [
  "breathing difficulty"
],

    riskLevel: "high",

    department: "Pulmonology",

    recommendations: [
      "Seek immediate medical attention",
      "Avoid physical exertion",
      "Use prescribed inhaler if available"
    ]
  },

  {
    name: "COVID-19",

    symptoms: [
      "fever",
      "cough",
      "breathing difficulty",
      "fatigue"
    ],

    criticalSymptoms: [
  "fever",
  "breathing difficulty"
],

    riskLevel: "high",

    department: "Infectious Diseases",

    recommendations: [
      "Isolate immediately",
      "Monitor oxygen levels",
      "Consult doctor"
    ]
  },

  {
    name: "Pneumonia",

    symptoms: [
      "cough",
      "chest pain",
      "breathing difficulty",
      "fever"
    ],

    criticalSymptoms: [
  "chest pain",
  "breathing difficulty"
],

    riskLevel: "high",

    department: "Pulmonology",

    recommendations: [
      "Seek medical attention",
      "Take prescribed medications",
      "Monitor breathing"
    ]
  },

  {
    name: "Dengue",

    symptoms: [
      "fever",
      "headache",
      "fatigue",
      "vomiting"
    ],

criticalSymptoms: [
  "fever",
  "vomiting"
],

    riskLevel: "high",

    department: "General Medicine",

    recommendations: [
      "Stay hydrated",
      "Monitor platelet count",
      "Consult doctor immediately"
    ]
  },

  {
    name: "Migraine",

    symptoms: [
      "headache",
      "vomiting"
    ],

    riskLevel: "medium",

    department: "Neurology",

    recommendations: [
      "Rest in dark room",
      "Avoid stress",
      "Take prescribed medication"
    ]
  },

  {
    name: "Bronchitis",

    symptoms: [
      "cough",
      "breathing difficulty",
      "fatigue"
    ],

    riskLevel: "medium",

    department: "Pulmonology",

    recommendations: [
      "Avoid smoking",
      "Stay hydrated",
      "Consult doctor if symptoms worsen"
    ]
  }
];

module.exports = diseases;