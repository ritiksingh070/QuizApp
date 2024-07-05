// src/pages/AllQuizzes.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Quizzes.css";

function AllQuizzes({ isLoggedIn }) {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get("http://localhost:5000/api/quiz/all");
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  const startQuiz = (quiz) => {
    console.log(quiz);
    setCurrentQuiz(quiz);
    console.log(currentQuiz);
    setSelectedAnswers(Array(quiz.questions.length).fill(null));
    setTimer(quiz.duration * 60);
    const id = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    setIntervalId(id);
  };

  const submitQuiz = () => {
    
    navigate("/result", { state: { selectedAnswers, currentQuiz } });
    clearInterval(intervalId);
    // console.log(`current + ${currentQuiz}`)

    // setCurrentQuiz(null);
  };

  const handleAnswerSelect = (index) => (e) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setSelectedAnswers(newAnswers);
  };

  return (
    <div>
      {currentQuiz ? (
        <div className="quiz-container">
          <h1>{currentQuiz.title}</h1>
          <p>
            Time remaining: {Math.floor(timer / 60)}:
            {("0" + (timer % 60)).slice(-2)}
          </p>
          <div className="question-container">
            <h2>{currentQuiz.questions[currentQuestionIndex].questionText}</h2>

            {currentQuiz.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedAnswers[currentQuestionIndex] === option}
                    onChange={handleAnswerSelect(index)}
                  />
                  {option}
                </label>
              )
            )}
          </div>
          <div className="quiz-buttons">
            {currentQuestionIndex > 0 && (
              <button
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex - 1)
                }
              >
                Previous
              </button>
            )}
            {currentQuestionIndex < currentQuiz.questions.length - 1 && (
              <button
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }
              >
                Next
              </button>
            )}
            <button onClick={submitQuiz}>Submit</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>All Quizzes</h1>
          <ul className="quiz-list">
            {quizzes.map((quiz) => (
              <li key={quiz._id}>
                <h2>{quiz.title}</h2>
                <p>Created by: {quiz.creator.username}</p>
                {isLoggedIn && (
                  <button onClick={() => startQuiz(quiz)}>Start Quiz</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AllQuizzes;
