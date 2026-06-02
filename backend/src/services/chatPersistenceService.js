const prisma =
  require(
    "../config/prisma"
  );

const createChat =
async (userId) => {

  return prisma.chat.create({

    data: {
      userId
    }

  });

};

const saveMessage =
async ({
  chatId,
  role,
  type,
  content
}) => {

  return prisma.message.create({

    data: {

      chatId,

      role,

      type,

      content

    }

  });

};

const getChatMessages =
async (chatId) => {

  return prisma.message.findMany({

    where: {
      chatId
    },

    orderBy: {
      createdAt: "asc"
    }

  });

};

module.exports = {

  createChat,

  saveMessage,

  getChatMessages

};
