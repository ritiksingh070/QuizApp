// models/Quiz.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: Number,
  maxTime: Number,
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  duration: { type: Number }, // duration in minutes
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  allowedAttempts: Number,
  
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;  




