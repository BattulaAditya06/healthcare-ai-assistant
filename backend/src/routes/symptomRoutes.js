const express = require("express");

const router = express.Router();

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
  symptomValidation,
  analyzeSymptoms
);

module.exports = router;