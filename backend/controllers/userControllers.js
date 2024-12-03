const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { generateOTP, sendOTP } = require("../config/generateOTP");
const { protect } = require("../middlewares/authMiddleware"); // Correct import

const router = express.Router();
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  if (!validatePassword(password)) {
    res.status(400);
    throw new Error(
      "Password must be at least 8 characters long, contain at least one numerical character, and at least one uppercase character"
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const otp = generateOTP();
  await sendOTP(email, otp);

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
      message: "OTP sent to your email. Please verify.",
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "Login Successful",
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});


router.get("/profile", protect, getUserProfile);

module.exports = { registerUser, authUser, router };
