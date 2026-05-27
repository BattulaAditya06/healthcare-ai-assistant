const {
  processChatMessage
} = require("../services/chatService");

const analyzeChat =
async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {

      return res.status(400).json({

        success: false,

        message:
          "Message is required."

      });

    }

    const response =
      await processChatMessage(
        message
      );

    return res.status(200).json(
      response
    );

  } catch (error) {

    console.error(
      "Chat Controller Error:",
      error.message
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error."

    });

  }

};

module.exports = {
  analyzeChat
};