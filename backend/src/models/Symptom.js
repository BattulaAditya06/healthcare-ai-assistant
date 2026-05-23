const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    category: {
      type: String,
      required: true
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Symptom", symptomSchema);