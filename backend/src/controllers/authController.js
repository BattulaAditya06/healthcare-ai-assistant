
const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const prisma =
require("../config/prisma");

// REGISTER
const register =
async (req, res) => {

  try {

    console.log(
      "REGISTER BODY:",
      req.body
    );

    const {

      name,

      email,

      password

    } = req.body;

    // VALIDATION
    if (

      !name ||

      !email ||

      !password

    ) {

      return res.status(400).json({

        success: false,

        message:
          "All fields are required"

      });

    }

    // CHECK EXISTING USER
    const existingUser =
      await prisma.user.findUnique({

        where: {
          email
        }

      });

    console.log(
      "EXISTING USER:",
      existingUser
    );

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists"

      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    console.log(
      "HASHED PASSWORD CREATED"
    );

    // CREATE USER
    const user =
      await prisma.user.create({

        data: {

          name,

          email,

          password:
            hashedPassword

        }

      });

    console.log(
      "USER CREATED:",
      user
    );

    // GENERATE TOKEN
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

    console.log(
      "TOKEN GENERATED"
    );

    return res.status(201).json({

      success: true,

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email

      }

    });

  } catch (error) {

    console.log(
      "REGISTER ERROR FULL:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error"

    });

  }

};

// LOGIN
const login =
async (req, res) => {

  try {

    console.log(
      "LOGIN BODY:",
      req.body
    );

    const {

      email,

      password

    } = req.body;

    // VALIDATION
    if (

      !email ||

      !password

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password required"

      });

    }

    // FIND USER
    const user =
      await prisma.user.findUnique({

        where: {
          email
        }

      });

    console.log(
      "FOUND USER:",
      user
    );

    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid credentials"

      });

    }

    // PASSWORD CHECK
    const isMatch =
      await bcrypt.compare(

        password,

        user.password

      );

    console.log(
      "PASSWORD MATCH:",
      isMatch
    );

    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid credentials"

      });

    }

    // GENERATE TOKEN
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

    console.log(
      "LOGIN TOKEN GENERATED"
    );

    return res.status(200).json({

      success: true,

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email

      }

    });

  } catch (error) {

    console.log(
      "LOGIN ERROR FULL:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
          "Internal server error"

    });

  }

};

module.exports = {

  register,

  login

};
