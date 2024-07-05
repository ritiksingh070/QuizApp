// ResultPage.jsx

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAnswers, currentQuiz } = location.state || {};

  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  if (!selectedAnswers || !currentQuiz) {
    return <div>No data available</div>;
  }
  const goBackToQuiz = () => {
    navigate("/all-quizzes");
  };

  useEffect(() => {
    const calculateScore = () => {
      let newScore = 0;
      let totalScore = 0;
      currentQuiz.questions.forEach((question, index) => {
        if (
          selectedAnswers[index] ===
          question.options[question.correctAnswer - 1]
        ) {
          newScore += 1;
        }
        totalScore += 1;
      });
      setTotalScore(totalScore);
      setScore(newScore);
    };

    calculateScore();
  }, [currentQuiz, selectedAnswers]);

  return (
    <div>
      <h1>Quiz Results</h1>
      <h1>Quiz Name : {currentQuiz.title}</h1>
      <h1>
        Your Score: {score} out of {totalScore}
      </h1>

      <table border="1">
        <thead>
          <tr>
            <th>Question</th>
            <th>Selected Answer</th>
            <th>Correct Answer</th>
            <th> Scored Marks</th>
          </tr>
        </thead>
        <tbody>
          {currentQuiz.questions.map((question, index) => (
            <tr key={question._id}>
              <td>{question.questionText}</td>
              <td>{selectedAnswers[index]}</td>
              <td>{question.options[question.correctAnswer - 1]}</td>
              <td>
                {selectedAnswers[index] ===
                question.options[question.correctAnswer - 1]
                  ? 1
                  : 0}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>Total Achieved Score</td>
            <td>{score}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={goBackToQuiz}>Go to All Quizzes</button>
    </div>
  );
};

export default ResultPage;
