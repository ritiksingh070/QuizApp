// src/components/Navbar.jsx

import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="navbar">
      <NavLink to="/" end>Home</NavLink>
      {!isLoggedIn ? (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/all-quizzes">All Quizzes</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/create-quiz">Create Quiz</NavLink>
          <NavLink to="/all-quizzes">All Quizzes</NavLink>
          <NavLink to="/my-quizzes">My Quizzes</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
