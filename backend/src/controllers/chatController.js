
const prisma =
require(
  "../config/prisma"
);

const chatService =
require(
  "../services/chatService"
);

// =========================
// ANALYZE CHAT
// =========================

const analyzeChat =
async (
  req,
  res
) => {

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

// =========================
// GET CHAT MESSAGES
// =========================

const getMessages =
async (
  req,
  res
) => {

  try {

    const chat =
      await prisma.chat.findFirst({

        where: {
          userId:
            req.user.id
        },

        include: {

          messages: {

            orderBy: {
              createdAt: "asc"
            }

          }

        }

      });

    if (!chat) {

      return res.status(200).json([]);

    }

    return res.status(200).json(
      chat.messages
    );

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
