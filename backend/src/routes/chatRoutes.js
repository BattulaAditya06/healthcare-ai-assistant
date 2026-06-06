const express =
require("express");

const router =
  express.Router();

const {

  analyzeChat,

  getMessages

} = require(
  "../controllers/chatController"
);

const protect =
require(
  "../middleware/authMiddleware"
);

// =========================
// SEND MESSAGE
// =========================

router.post(
  "/",
  protect,
  analyzeChat
);

// =========================
// GET CHAT HISTORY
// =========================

router.get(
  "/messages",
  protect,
  getMessages
);

module.exports =
  router;
