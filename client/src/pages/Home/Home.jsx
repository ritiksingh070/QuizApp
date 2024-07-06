import React from 'react';
import './Home.css';

const Home = () => {
  const getStarted = ()=>{
    window.location.href = '/all-quizzes';
  }
  return (
    <div className="home-container">
      <div className="info-page">
        <div className="left-side">
          <h1>Welcome to QuizzyMind – where knowledge meets fun!</h1>
          <p>QuizzyMind, Kolkata's top quiz app, thrills thousands with diverse challenges. Launched six months ago, it's a favorite for solo and group play, offering topics from general knowledge to pop culture. With a user-friendly interface and interactive features, QuizzyMind promises continuous excitement and learning. Join Kolkata's quizzing community today and explore our expanding library.</p>
          <button className="info-button" onClick={getStarted}>Get Started</button>
        </div>
        <div className="right-side">
          <div className="info-image">
            <img src={"/images/quizHome.jpeg"} alt="" />
          </div>
        </div>
      </div>

      <div className="reviews-container">
        <h2>What People are Saying</h2>
        <div className="review-card">
          <div className="review-image">
            <img src={"/images/profile1.jpeg"} alt="" />
          </div>
          <div className="review-content">
            <h3>John Doe</h3>
            <p>"QuizzyMind is fantastic! It's helped me learn so much while having fun. Highly recommended!"</p>
          </div>
        </div>
        <div className="review-card">
          <div className="review-image">
            <img src={"/images/profile2.jpeg"} alt="" />
          </div>
          <div className="review-content">
            <h3>Jane Smith</h3>
            <p>"As a teacher, I use QuizzyMind for quizzes in my classroom. My students love it!"</p>
          </div>
        </div>
        <div className="review-card">
          <div className="review-image">
            <img src={"/images/profile3.jpeg"} alt="" />
          </div>
          <div className="review-content">
            <h3>Leena Parkor</h3>
            <p>"As a teacher, I use QuizzyMind for quizzes in my classroom. My students love it!"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
