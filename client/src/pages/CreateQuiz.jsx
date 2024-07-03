// src/pages/CreateQuiz.jsx
import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
  const [duration, setDuration] = useState('');

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'options') {
      newQuestions[index].options = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/quiz/create',
        { title, questions, duration },
        { headers: { Authorization: token } }
      );
      alert('Quiz created successfully');
    } catch (err) {
      alert('Failed to create quiz');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((q, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
          />
          {q.options.map((opt, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...q.options];
                newOptions[optIndex] = e.target.value;
                handleQuestionChange(index, 'options', newOptions);
              }}
            />
          ))}
          <input
            type="text"
            placeholder="Answer"
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default CreateQuiz;
