// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateQuiz from "./pages/CreateQuiz";
import AllQuizzes from "./pages/AllQuizzes";
import MyQuizzes from "./pages/MyQuizzes";
import ResultPage from "./pages/ResultPage";
import "./App.css";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route
          path="/all-quizzes"
          element={<AllQuizzes isLoggedIn={isLoggedIn} />}
        />
        {isLoggedIn && <Route path="/my-quizzes" element={<MyQuizzes />} />}
        {isLoggedIn && <Route path="/result" element={<ResultPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
