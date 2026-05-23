const express = require("express");

const router = express.Router();

const {
  getSession
} = require("../controllers/sessionController");

router.get("/:sessionId", getSession);

module.exports = router;