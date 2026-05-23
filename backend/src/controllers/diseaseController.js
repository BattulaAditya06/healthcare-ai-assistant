const Disease = require("../models/Disease");

const getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();

    res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDiseases
};