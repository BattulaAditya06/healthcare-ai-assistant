const prisma =
require("../config/prisma");

const getOrCreateUserChat =
async (userId) => {

  let chat =
    await prisma.chat.findFirst({

      where: {
        userId
      },

      include: {
        messages: true
      }

    });

  if (!chat) {

    chat =
      await prisma.chat.create({

        data: {

          userId,

          currentSymptoms: [],

          negativeSymptoms: [],

          askedSymptoms: []

        },

        include: {
          messages: true
        }

      });

  }

  return chat;

};

module.exports = {
  getOrCreateUserChat
};