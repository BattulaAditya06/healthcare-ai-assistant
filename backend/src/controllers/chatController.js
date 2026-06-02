
const chatService =
require(
  "../services/chatService"
);

const {

  getOrCreateUserChat

} = require(
  "../services/userChatService"
);

// ANALYZE CHAT
const analyzeChat =
async (req, res) => {

  try {

    const response =
      await chatService(

        req.user.id,

        req.body.message

      );

    return res.status(200).json(
      response
    );

  } catch (error) {

    console.log(
      "Chat Controller Error:",
      error.message
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error"

    });

  }

};

// GET CHAT MESSAGES
const getMessages =
async (req, res) => {

  try {

    const chat =
      await getOrCreateUserChat(
        req.user.id
      );

    return res.status(200).json({

      success: true,

      messages:
        chat.messages || []

    });

  } catch (error) {

    console.log(
      "Get Messages Error:",
      error.message
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error"

    });

  }

};

module.exports = {

  analyzeChat,

  getMessages

};
