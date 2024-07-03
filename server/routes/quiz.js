// routes/quiz.js
const express = require('express');
const Quiz = require('../models/Quiz');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

router.post('/create', authenticate, async (req, res) => {
  const { title, questions, duration } = req.body;
  try {
    const quiz = new Quiz({ title, questions, duration, creator: req.user.id });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create quiz' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('creator', 'username');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/my-quizzes', authenticate, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ creator: req.user.id });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
