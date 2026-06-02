const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    symptoms: [
      {
        type: String,
        required: true
      }
    ],

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    },

    department: {
      type: String,
      required: true
    },

    recommendations: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Disease", diseaseSchema);