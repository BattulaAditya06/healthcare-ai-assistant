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
// ANALYZE CHAT MESSAGE
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

// =========================
// EXPORT
// =========================

module.exports =
  router;