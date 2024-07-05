// src/components/Navbar.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {!isLoggedIn ? (
          <>
            <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
            <NavLink to="/signup" onClick={closeMenu}>Signup</NavLink>
            <NavLink to="/all-quizzes" onClick={closeMenu}>All Quizzes</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/create-quiz" onClick={closeMenu}>Create Quiz</NavLink>
            <NavLink to="/all-quizzes" onClick={closeMenu}>All Quizzes</NavLink>
            <NavLink to="/my-quizzes" onClick={closeMenu}>My Quizzes</NavLink>
            <button onClick={() => { handleLogout(); closeMenu(); }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
