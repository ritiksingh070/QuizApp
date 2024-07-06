// routes/quiz.js
const express = require("express");
const Quiz = require("../models/Quiz");
const jwt = require("jsonwebtoken");

const router = express.Router();
require('dotenv').config();
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

router.post("/create", authenticate, async (req, res) => {
  const { title, questions, duration, allowedAttempts } = req.body;
  try {
    const quiz = new Quiz({
      title,
      questions,
      duration,
      allowedAttempts,
      creator: req.user.id,
    });
    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to create quiz" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("creator", "username");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/my-quizzes", authenticate, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ creator: req.user.id });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/edit/:id", authenticate, async (req, res) => {
  const { title, questions, duration, allowedAttempts } = req.body;
  try {
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, creator: req.user.id },
      { title, questions, duration, allowedAttempts },
      { new: true }
    );
    if (!quiz) {
      return res
        .status(404)
        .json({
          error: "Quiz not found or you are not authorized to edit this quiz",
        });
    }
    res.json({ message: "Quiz updated successfully", quiz });
  } catch (err) {
    res.status(400).json({ error: "Failed to update quiz" });
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.params.id,
      creator: req.user.id,
    });
    if (!quiz) {
      return res
        .status(404)
        .json({
          error: "Quiz not found or you are not authorized to delete this quiz",
        });
    }
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

module.exports = router;
