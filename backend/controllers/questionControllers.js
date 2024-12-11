// controllers/questionController.js
const Question = require("../models/questionModel");

const getQuestionsByQuestionNumber = async (req, res) => {
  const questionNumber = req.params[0]; // Extract the full questionNumber

  try {
    // Perform the query using the questionNumber parameter
    const questions = await Question.find({
      QuestionNumber: { $regex: questionNumber, $options: "i" },
    });

    // If no questions are found, send a 404 response
    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    // Send the questions in the response
    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching questions", error: err });
  }
};




const getQuestionsBySubtopic = async (req, res) => {
  try {
    const subtopic = req.params.subtopic;

    // Find all questions matching the subtopic (case-insensitive)
    const questions = await Question.find({
      Sub_topic: { $regex: new RegExp(subtopic, "i") }, // case-insensitive search
    });

    if (questions.length === 0) {
      return res.status(404).json({
        message: `No questions found for subtopic(s): ${subtopic}`,
      });
    }

    return res.status(200).json({
      message: "Questions fetched successfully",
      questions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching questions by subtopic",
      error: error.message,
    });
  }
};


module.exports = {
  getQuestionsByQuestionNumber,
  getQuestionsBySubtopic,
};