const followUpSymptoms = {

  "headache": {

    minimumAnswers: 3,

    questions: [

      "Is the headache on one side of your head?",

      "Do you have nausea or vomiting?",

      "Are you sensitive to light or loud sounds?",

      "Did the headache start suddenly?",

      "Do you have fever or neck stiffness?"

    ]

  },

  "fever": {

    minimumAnswers: 3,

    questions: [

      "How high is your temperature?",

      "Do you have chills or shivering?",

      "Do you also have cough or sore throat?",

      "Have you recently traveled or been around someone who was sick?"

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

    minimumAnswers: 3,

    questions: [

      "Does the pain spread to your left arm, jaw, or shoulder?",

      "Do you feel short of breath?",

      "Is the pain sharp, burning, or pressure-like?",

      "Did the pain start suddenly?",

      "Does it become worse while taking a deep breath?"

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

      "Is your eye red?",

      "Is your vision blurred?",

      "Are you sensitive to light?",

      "Do you have discharge from the eye?"

    ]

  },

};

module.exports = {

  followUpSymptoms,

  immediateEmergency

};