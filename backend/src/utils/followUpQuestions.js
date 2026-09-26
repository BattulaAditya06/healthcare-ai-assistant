const followUpQuestions = {

  // =========================
  // GENERAL
  // =========================

  "fever": [
    "What is your highest recorded temperature?",
    "How many days have you had fever?",
    "Do you have chills or shivering?",
    "Do you have body aches?"
  ],

  "headache": [
    "Where is the headache located?",
    "Did it start suddenly?",
    "Are you sensitive to light or sound?",
    "Do you have nausea or vomiting?"
  ],

  "dizziness": [
    "Does the room feel like it is spinning?",
    "Did you faint or almost faint?",
    "Does standing up make it worse?",
    "Do you have headache or blurred vision?"
  ],

  "fatigue": [
    "How long have you felt tired?",
    "Does rest improve it?",
    "Do you have fever or weight loss?",
    "Does it affect daily activities?"
  ],

  // =========================
  // RESPIRATORY
  // =========================

  "cough": [
    "Is it dry or with mucus?",
    "How long have you been coughing?",
    "Do you have fever?",
    "Are you short of breath?"
  ],

  "shortness of breath": [
    "Did it begin suddenly?",
    "Does it occur even at rest?",
    "Do you have chest pain?",
    "Do you hear wheezing?"
  ],

  "runny nose": [
    "Is the discharge clear or thick?",
    "Are you sneezing frequently?",
    "Do you have sore throat?",
    "Do you have fever?"
  ],

  "sore throat": [
    "Is swallowing painful?",
    "Do you have fever?",
    "Do you have cough?",
    "Do you notice swollen neck glands?"
  ],

  "wheezing": [
    "Does it worsen at night?",
    "Have you had asthma before?",
    "Do you have cough?",
    "Does exercise make it worse?"
  ],

  // =========================
  // CARDIAC
  // =========================

  "chest pain": [
    "Does the pain spread to your arm or jaw?",
    "Does it feel like pressure or tightness?",
    "Are you sweating excessively?",
    "Are you short of breath?"
  ],

  "palpitations": [
    "Did they begin suddenly?",
    "Do you feel dizzy during them?",
    "Do they occur during exercise?",
    "Do they stop on their own?"
  ],

  // =========================
  // GASTRO
  // =========================

  "abdominal pain": [
    "Where exactly is the pain?",
    "Did it begin suddenly?",
    "Do you have vomiting?",
    "Do you have diarrhea?"
  ],

  "vomiting": [
    "How many times have you vomited?",
    "Is there blood in the vomit?",
    "Can you keep fluids down?",
    "Do you have abdominal pain?"
  ],

  "nausea": [
    "Have you vomited?",
    "Did it start after eating?",
    "Do you have abdominal pain?",
    "Do you have fever?"
  ],

  "diarrhea": [
    "How many times today?",
    "Is there blood in the stool?",
    "Do you have abdominal cramps?",
    "Do you have fever?"
  ],

  "constipation": [
    "How many days since your last bowel movement?",
    "Do you have abdominal pain?",
    "Have you noticed blood?",
    "Are you passing gas?"
  ],

  // =========================
  // EYE
  // =========================

  "eye pain": [
    "Is your eye red?",
    "Is your vision blurred?",
    "Are you sensitive to light?",
    "Did the pain begin after an injury?"
  ],

  "blurred vision": [
    "Did it begin suddenly?",
    "Is one eye affected or both?",
    "Do you have eye pain?",
    "Do you have headache?"
  ],

  "eye redness": [
    "Do you have discharge?",
    "Is your vision blurred?",
    "Is the eye itchy?",
    "Do you wear contact lenses?"
  ],

  // =========================
  // ENT
  // =========================

  "ear pain": [
    "Is your hearing reduced?",
    "Do you have fever?",
    "Is there ear discharge?",
    "Did it begin after swimming?"
  ],

  "hearing loss": [
    "Did it begin suddenly?",
    "Is one ear affected?",
    "Do you have ringing in the ear?",
    "Do you have dizziness?"
  ],

  // =========================
  // MUSCULOSKELETAL
  // =========================

  "joint pain": [
    "Is the joint swollen?",
    "Is it warm to touch?",
    "Did you have an injury?",
    "Can you move it normally?"
  ],

  "back pain": [
    "Where is the pain located?",
    "Does it spread to your legs?",
    "Did you lift something heavy?",
    "Do you have numbness?"
  ],

  "neck pain": [
    "Did it begin after an injury?",
    "Do you have stiffness?",
    "Does it spread to your arms?",
    "Do you have fever?"
  ],

  "wrist pain": [
    "Was there an injury?",
    "Do you have swelling?",
    "Do you have numbness?",
    "Can you move your wrist?"
  ],

  "knee pain": [
    "Did you twist your knee?",
    "Is there swelling?",
    "Can you walk normally?",
    "Does it lock while walking?"
  ],

  // =========================
  // SKIN
  // =========================

  "rash": [
    "Is it itchy?",
    "Did it spread quickly?",
    "Do you have fever?",
    "Did you start any new medicine?"
  ],

  "itching": [
    "Is there a rash?",
    "Did you use a new soap or lotion?",
    "Is it worse at night?",
    "Do you have swelling?"
  ],

  // =========================
  // URINARY
  // =========================

  "burning urination": [
    "Do you urinate frequently?",
    "Do you have fever?",
    "Do you have lower abdominal pain?",
    "Have you noticed blood in urine?"
  ],

  "frequent urination": [
    "Do you have burning while urinating?",
    "Are you drinking more water than usual?",
    "Do you wake up at night to urinate?",
    "Do you have fever?"
  ],

  // =========================
  // NEUROLOGICAL
  // =========================

"migraine": [
    "Is the pain on one side of your head?",
    "Are you sensitive to light or sound?",
    "Do you have nausea or vomiting?",
    "Have you experienced this type of headache before?"
  ],

  "numbness": [
    "Which body part is affected?",
    "Did it begin suddenly?",
    "Do you have weakness?",
    "Do you have difficulty speaking?"
  ],

  "weakness": [
    "Is one side of the body affected?",
    "Did it begin suddenly?",
    "Can you walk normally?",
    "Do you have numbness?"
  ]

};

module.exports = followUpQuestions;