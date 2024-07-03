// src/pages/MyQuizzes.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/quiz/my-quizzes', {
        headers: { Authorization: token },
      });
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>My Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <h2>{quiz.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyQuizzes;
