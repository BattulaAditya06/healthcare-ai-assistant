const express = require("express");

const {
  getSymptoms
} = require("../controllers/symptomController");

const router = express.Router();

router.get("/", getSymptoms);

module.exports = router;