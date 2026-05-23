const Symptom = require("../models/Symptom");

const getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();

    res.status(200).json({
      success: true,
      count: symptoms.length,
      data: symptoms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getSymptoms
};