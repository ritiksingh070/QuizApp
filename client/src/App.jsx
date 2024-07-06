// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import AllQuizzes from "./pages/AllQuizzes/AllQuizzes";
import MyQuizzes from "./pages/MyQuizzes/MyQuizzes";
import ResultPage from "./pages/ResultPage/ResultPage";
import "./App.css";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href("/");
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
