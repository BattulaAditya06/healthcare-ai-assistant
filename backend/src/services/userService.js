const prisma =
require(
"../config/prisma"
);

const createUser =
async ({
name,
email,
password
}) => {

return prisma.user.create({


data: {
  name,
  email,
  password
}


});

};

const getUserByEmail =
async (email) => {

return prisma.user.findUnique({


where: {
  email
}


});

};

module.exports = {

createUser,

getUserByEmail

};
