import { useState } from "react";
import axios from "axios";
import "./CreateQuiz.css";

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

  const removeQuestion = (index) => {
    if (quizData.questions.length > 1) {
      const newQuestions = quizData.questions.filter((_, i) => i !== index);
      setQuizData({ ...quizData, questions: newQuestions });
    } else {
      alert("You need at least one question in the quiz.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, questions, allowedAttempts, duration } = quizData;
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
    <div className="createQuizContainer">
      <form onSubmit={handleSubmit} className="quiz-form">
        <h2>Create Quiz</h2>
        <div className="form-group">
          <label htmlFor="quizTitle">Quiz Title</label>
          <input
            type="text"
            id="quizTitle"
            placeholder="Enter Quiz Title"
            value={quizData.title}
            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
          />
        </div>
        {quizData.questions.map((question, index) => (
          <div key={index} className="question">
            <div className="form-group">
              <label htmlFor={`questionText-${index}`}>Question {index + 1}</label>
              <input
                type="text"
                id={`questionText-${index}`}
                placeholder="Enter Question Text"
                value={question.questionText}
                onChange={(e) => handleChange(e, index, "questionText")}
              />
            </div>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="form-group">
                <label htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}</label>
                <input
                  type="text"
                  id={`option-${index}-${optionIndex}`}
                  placeholder={`Enter Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(e, index, optionIndex)}
                />
              </div>
            ))}
            <div className="form-group">
              <label htmlFor={`correctAnswer-${index}`}>Correct Answer (Option (1-4))</label>
              <input
                type="number"
                id={`correctAnswer-${index}`}
                placeholder="Enter Correct Answer"
                value={question.correctAnswer}
                onChange={(e) => handleChange(e, index, "correctAnswer")}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`maxTime-${index}`}>Max Time (in seconds)</label>
              <input
                type="number"
                id={`maxTime-${index}`}
                placeholder="Enter Max Time"
                value={question.maxTime}
                onChange={(e) => handleChange(e, index, "maxTime")}
              />
            </div>
            <button type="button" className="remove-question" onClick={() => removeQuestion(index)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="add-question">
          Add Question
        </button>
        <div className="form-group">
          <label htmlFor="allowedAttempts">Allowed Attempts</label>
          <input
            type="number"
            id="allowedAttempts"
            placeholder="Enter Allowed Attempts"
            value={quizData.allowedAttempts}
            onChange={(e) =>
              setQuizData({ ...quizData, allowedAttempts: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in minutes)</label>
          <input
            type="number"
            id="duration"
            placeholder="Enter Duration"
            value={quizData.duration}
            onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
