import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="info-page">
      <div className="left-side">
        <h1>Welcome to Our Website</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
        <button className="info-button">Learn More</button>
      </div>
      <div className="right-side">
        <img src="https://ascentas.co.uk/wp-content/uploads/2022/11/TwoMenScreen.png" alt="Placeholder" className="info-image" />
      </div>
    </div>
  );
}

export default Home;
