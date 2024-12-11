const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionControllers"); // import your controller

// Define the route for fetching questions by question number
router.get("/api/*", questionController.getQuestionsByQuestionNumber);
module.exports = router;
