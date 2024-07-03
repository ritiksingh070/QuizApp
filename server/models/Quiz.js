// models/Quiz.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  duration: { type: Number, required: true }, // duration in minutes
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
