const followUpSymptoms = {

"headache": {

  minimumAnswers: 3,

  questions: [

    {

      id: "nausea",

      question: "Do you have nausea?",

      positiveSymptom: "nausea"

    },

    {

      id: "light",

      question: "Are you sensitive to light?",

      positiveSymptom: "photophobia"

    },

    {

      id: "onesided",

      question: "Is the headache on one side?",

      positiveSymptom: "one sided headache"

    },

    {

      id: "neck",

      question: "Do you have neck stiffness?",

      positiveSymptom: "neck stiffness"

    }

  ]

},

 "fever": {

  minimumAnswers: 3,

  questions: [

    {

      id: "chills",

      question: "Do you have chills?",

      positiveSymptom: "chills"

    },

    {

      id: "cough",

      question: "Do you also have cough?",

      positiveSymptom: "cough"

    },

    {

      id: "body",

      question: "Do you have body pain?",

      positiveSymptom: "body pain"

    },

    {

      id: "throat",

      question: "Do you have sore throat?",

      positiveSymptom: "sore throat"

    }

  ]

},

  "cough": {

    minimumAnswers: 3,

    questions: [

      "Is your cough dry or producing mucus?",

      "How long have you had the cough?",

      "Do you have shortness of breath?",

      "Do you have chest pain while coughing?"

    ]

  },

"chest pain": {

  minimumAnswers: 4,

  questions: [

    {

      id: "leftarm",

      question: "Does the pain spread to your left arm?",

      positiveSymptom: "left arm pain"

    },

    {

      id: "breathing",

      question: "Are you short of breath?",

      positiveSymptom: "shortness of breath"

    },

    {

      id: "pressure",

      question: "Does it feel like pressure or tightness?",

      positiveSymptom: "chest pressure"

    },

    {

      id: "sweating",

      question: "Are you sweating excessively?",

      positiveSymptom: "cold sweating"

    }

  ]

},

  "abdominal pain": {

    minimumAnswers: 3,

    questions: [

      "Where exactly is the pain located?",

      "Do you have nausea or vomiting?",

      "Do you have diarrhea or constipation?",

      "Did the pain begin suddenly?"

    ]

  },

 
"eye pain": {

  minimumAnswers: 3,

  questions: [

    {

      id: "eye_red",

      question: "Is your eye red?",

      positiveSymptom: "eye redness"

    },

    {

      id: "blurred",

      question: "Is your vision blurred?",

      positiveSymptom: "blurred vision"

    },

    {

      id: "light",

      question: "Are you sensitive to light?",

      positiveSymptom: "photophobia"

    },

    {

      id: "discharge",

      question: "Do you have eye discharge?",

      positiveSymptom: "eye discharge"

    }

  ]

},

};

module.exports = {

  followUpSymptoms,

  immediateEmergency

};