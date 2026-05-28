const processChatMessage =
require(
  "../services/chatService"
);

const analyzeChat =
async (req, res) => {

  try {

    const { message } =
      req.body;

    const result =
      await processChatMessage(
        message
      );

    res.status(200).json(
      result
    );

  } catch (error) {

    console.log(
      "Chat Controller Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        "Internal server error."

    });

  }

};

module.exports = {

  analyzeChat

};