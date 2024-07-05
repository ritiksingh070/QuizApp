// src/pages/MyQuizzes.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [editQuiz, setEditQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/quiz/my-quizzes", {
        headers: { Authorization: token },
      });
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/quiz/delete/${id}`, {
        headers: { Authorization: token },
      });
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { _id, title, questions, duration, allowedAttempts } = editQuiz;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/quiz/edit/${_id}`,
        { title, questions, duration, allowedAttempts },
        { headers: { Authorization: token } }
      );
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === _id ? res.data.quiz : quiz))
      );
      setEditQuiz(null);
      alert("quiz successfully edited")
    } catch (err) {
      console.error("Failed to edit quiz:", err);
    }
  };

  const handleChange = (e, index, field) => {
    const newQuestions = [...editQuiz.questions];
    newQuestions[index][field] = e.target.value;
    setEditQuiz({ ...editQuiz, questions: newQuestions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...editQuiz.questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setEditQuiz({ ...editQuiz, questions: newQuestions });
  };

  const addQuestion = () => {
    setEditQuiz({
      ...editQuiz,
      questions: [
        ...editQuiz.questions,
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
          maxTime: 0,
        },
      ],
    });
  };

  return (
    <div>
      <h1>My Quizzes</h1>
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <h2>{quiz.title}</h2>
            <button
              onClick={() => {
                setEditQuiz(quiz);
                console.log(editQuiz);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(quiz._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editQuiz && (
        <form onSubmit={handleEdit}>
          <h2>Edit Quiz</h2>
          <input
            type="text"
            placeholder="Quiz Title"
            value={editQuiz.title}
            onChange={(e) =>
              setEditQuiz({ ...editQuiz, title: e.target.value })
            }
          />
          {editQuiz.questions.map((question, index) => (
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
            value={editQuiz.allowedAttempts}
            onChange={(e) =>
              setEditQuiz({ ...editQuiz, allowedAttempts: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Duration (in minutes)"
            value={editQuiz.duration}
            onChange={(e) =>
              setEditQuiz({ ...editQuiz, duration: e.target.value })
            }
          />
          <button type="submit">Create Quiz</button>
        </form>
      )}
    </div>
  );
}

export default MyQuizzes;
