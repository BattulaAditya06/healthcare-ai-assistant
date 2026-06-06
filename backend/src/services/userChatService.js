
const prisma =
require(
  "../config/prisma"
);

const getOrCreateUserChat =
async (
  userId
) => {

  let chat =
    await prisma.chat.findFirst({

      where: {
        userId
      },

      orderBy: {
        createdAt: "desc"
      }

    });

  // CREATE NEW CHAT
  if (!chat) {

    chat =
      await prisma.chat.create({

        data: {

          userId,

          currentSymptoms: [],

          negativeSymptoms: [],

          askedSymptoms: []

        }

      });

  }

  return chat;

};

module.exports = {
  getOrCreateUserChat
};
