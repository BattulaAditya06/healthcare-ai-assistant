
const express =
require("express");

const router =
express.Router();

const authMiddleware =
require(
  "../middleware/authMiddleware"
);

const {

  analyzeChat,

  getMessages

} = require(
  "../controllers/chatController"
);

// SEND CHAT MESSAGE
router.post(

  "/",

  authMiddleware,

  analyzeChat

);

// GET CHAT HISTORY
router.get(

  "/messages",

  authMiddleware,

  getMessages

);

module.exports =
router;
