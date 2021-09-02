const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const validateSignUp = require("../auth/signup");
const validateLogin = require("../auth/login");
const keys = require("../config/keys");

const router = express.Router();
const saltRounds = 10;

/**
 * Fetch a user
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).limit(20).lean();
    res.send({
      status: true,
      message: "fetched users successfully",
      users,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      message: error.message,
    });
  }
});

/**
 * Sign up new user
 */
router.post("/signup", async (req, res) => {
  try {
    console.log("trying to save new user", req.body);

    // validate sign up
    const { errors, isValid } = validateSignUp(req.body);
    if (!isValid) {
      return res.send({
        errors,
        status: false,
        message: "Not a valid form",
      });
    }

    const { firstName, lastName, age, email, password } = req.body;

    // check if email already exists
    const user = await User.findOne({
      email,
    }).lean();
    if (user) {
      console.log(`User already exists`);
      return res.send({
        status: false,
        errors: {
          email: "User already exists with same email address",
        },
        message: "User already exists with same email address",
      });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      age,
      email,
      password: hash,
    });

    await newUser.save();

    res.send({
      user: newUser,
      status: true,
      message: "User successfully saved",
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      message: error.message,
    });
  }
});

/**
 * Login a user
 */
router.post("/login", async (req, res) => {
  try {
    console.log(`New login detected`);

    // validate login
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
      return res.send({
        status: false,
        message: "Not a valid form",
        errors,
      });
    }

    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({
      email,
    }).lean();
    if (!user) {
      return res.send({
        errors: {
          email: "Email not found",
        },
        status: false,
        message: `Email not found`,
      });
    }

    // compare password
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      delete user.password;
      const jwtPayload = user;

      const token = await jwt.sign(jwtPayload, keys.secretOrKey, {
        expiresIn: 3600,
      });
      return res.send({
        status: true,
        message: `Logged in successfully`,
        token: `Bearer ${token}`,
      });
    }
    res.send({
      errors: {
        password: "Password is incorrect",
      },
      status: false,
      message: `Password incorrect`,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      message: error.message,
    });
  }
});

/**
 * follow a user
 */
router.put("/follow", async (req, res) => {
  try {
    const { userId, follows } = req.body;

    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          follows,
        },
      }
    );
    res.send({
      status: true,
      message: `Successful follow`,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      message: `Failed to follow`,
    });
  }
});

module.exports = router;
