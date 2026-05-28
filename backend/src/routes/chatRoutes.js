const express =
require("express");

const router =
express.Router();

const {
  analyzeChat
} = require(
  "../controllers/chatController"
);

router.post(
  "/analyze",
  analyzeChat
);

module.exports = router;