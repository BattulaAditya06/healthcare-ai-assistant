const express = require("express");

const {
  getDiseases
} = require("../controllers/diseaseController");

const router = express.Router();

router.get("/", getDiseases);

module.exports = router;