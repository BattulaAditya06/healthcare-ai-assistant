const express = require("express");

const router = express.Router();

const validateChatInput =
require(
  "../middleware/validateChatInput"
);

const {
  getSymptoms,
} = require("../controllers/symptomController");

const {
  analyzeSymptoms,
} = require("../controllers/analyzeController");

const {
  symptomValidation,
} = require("../validators/symptomValidator");

router.get("/", getSymptoms);

router.post(

  "/analyze",

  validateChatInput,

  analyzeSymptoms

);

module.exports = router;