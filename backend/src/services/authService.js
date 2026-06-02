const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const prisma =
require("../config/prisma");

// REGISTER
const registerUser =
async ({

  name,

  email,

  password

}) => {

  const existingUser =
    await prisma.user.findUnique({

      where: {
        email
      }

    });

  if (existingUser) {

    throw new Error(
      "User already exists"
    );

  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const user =
    await prisma.user.create({

      data: {

        name,

        email,

        password:
          hashedPassword

      }

    });

  const token =
    jwt.sign(

      {
        id: user.id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

  return {

    token,

    user: {

      id: user.id,

      name: user.name,

      email: user.email

    }

  };

};

// LOGIN
const loginUser =
async ({

  email,

  password

}) => {

  const user =
    await prisma.user.findUnique({

      where: {
        email
      }

    });

  if (!user) {

    throw new Error(
      "Invalid credentials"
    );

  }

  const isPasswordValid =
    await bcrypt.compare(

      password,

      user.password

    );

  if (!isPasswordValid) {

    throw new Error(
      "Invalid credentials"
    );

  }

  const token =
    jwt.sign(

      {
        id: user.id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

  return {

    token,

    user: {

      id: user.id,

      name: user.name,

      email: user.email

    }

  };

};

module.exports = {

  registerUser,

  loginUser

};
