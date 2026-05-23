const express = require("express");

const {
  analyzeSymptoms
} = require("../controllers/analyzeController");

const router = express.Router();

router.post("/", analyzeSymptoms);

module.exports = router;