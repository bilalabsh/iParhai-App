const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST request to register user
router.post("/", registerUser);

// POST request to login user
router.post("/login", authUser);


module.exports = router;
