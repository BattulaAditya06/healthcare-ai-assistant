const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true
    },

    symptoms: [
      {
        type: String
      }
    ],

chatHistory: [
  {
    sender: {
      type: String
    },

    message: {
      type: String
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  }
],

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Session", sessionSchema);