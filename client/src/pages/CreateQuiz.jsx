import { useState } from "react";
import axios from "axios";

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    questions: [
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: null,
        maxTime: null,
      },
    ],
    allowedAttempts: null,
    duration: null,
  });

  const handleChange = (e, index, field) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index][field] = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
          maxTime: 0,
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(quizData);
    console.log(quizData.title);
    console.log(quizData.questions);
    console.log(quizData.allowedAttempts);
    console.log(quizData.duration);
    const title = quizData.title;
    const questions = quizData.questions;
    const allowedAttempts = quizData.allowedAttempts;
    const duration = quizData.duration;
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/quiz/create",
        { title, questions, duration, allowedAttempts },
        { headers: { Authorization: token } }
      );
      alert("Quiz created successfully");
    } catch (err) {
      alert("Failed to create quiz");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={quizData.title}
        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
      />
      {quizData.questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Question Text"
            value={question.questionText}
            onChange={(e) => handleChange(e, index, "questionText")}
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(e, index, optionIndex)}
            />
          ))}
          <input
            type="number"
            placeholder="Correct Answer (0-3)"
            value={question.correctAnswer}
            onChange={(e) => handleChange(e, index, "correctAnswer")}
          />
          <input
            type="number"
            placeholder="Max Time (in seconds)"
            value={question.maxTime}
            onChange={(e) => handleChange(e, index, "maxTime")}
          />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      <input
        type="number"
        placeholder="Allowed Attempts"
        value={quizData.allowedAttempts}
        onChange={(e) =>
          setQuizData({ ...quizData, allowedAttempts: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Duration (in minutes)"
        value={quizData.duration}
        onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })}
      />
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default CreateQuiz;

