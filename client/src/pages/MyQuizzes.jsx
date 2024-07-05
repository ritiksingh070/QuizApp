import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyQuizzes.css";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [editQuiz, setEditQuiz] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/quiz/my-quizzes", {
          headers: { Authorization: token },
        });
        setQuizzes(res.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
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
      setShowEditModal(false); // Close modal after successful edit
      alert("Quiz successfully edited");
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

  const removeQuestion = (index) => {
    const newQuestions = editQuiz.questions.filter((_, i) => i !== index);
    setEditQuiz({ ...editQuiz, questions: newQuestions });
  };

  const openEditModal = (quiz) => {
    setEditQuiz(quiz);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditQuiz(null);
    setShowEditModal(false);
  };

  return (
    <div className="my-quizzes-container">
      <h1>My Quizzes</h1>
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="quiz-item">
            <h2>{quiz.title}</h2>
            <div className="quiz-buttons">
              <button className="edit-button" onClick={() => openEditModal(quiz)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(quiz._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {showEditModal && (
        <div className="edit-modal-background">
          <div className="edit-modal">
            <button className="close-modal" onClick={closeEditModal}><i className="fa-solid fa-xmark" style={{fontSize:'1.4rem',color:'black'}}></i></button>
            <form className="edit-quiz-form" onSubmit={handleEdit}>
              <h2>Edit Quiz</h2>
              <input
                type="text"
                placeholder="Quiz Title"
                value={editQuiz.title}
                onChange={(e) => setEditQuiz({ ...editQuiz, title: e.target.value })}
              />
              {editQuiz.questions.map((question, index) => (
                <div key={index} className="question">
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
                  <div className="remove-question" onClick={() => removeQuestion(index)}>
                    <i className="fa-solid fa-trash-can" style={{fontSize:'1rem',color:'red'}}></i>
                  </div>
                </div>
              ))}
              <button type="button" className="add-question" onClick={addQuestion}>
                Add Question
              </button>
              <input
                type="number"
                placeholder="Allowed Attempts"
                value={editQuiz.allowedAttempts}
                onChange={(e) => setEditQuiz({ ...editQuiz, allowedAttempts: e.target.value })}
              />
              <input
                type="number"
                placeholder="Duration (in minutes)"
                value={editQuiz.duration}
                onChange={(e) => setEditQuiz({ ...editQuiz, duration: e.target.value })}
              />
              <button type="submit" className="submit-btn">Update Quiz</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyQuizzes;
