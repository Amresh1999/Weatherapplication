import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div  className="landing text-center p-12 h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 bg-cover animate-bgAnimation">
      <div className="animation-container">
        <div className="sun"></div>
        <div className="cloud"></div>
      </div>
      <h1>Welcome to Weather Forecast</h1>
      <p>Your one-stop destination for accurate weather information.</p>
      <Link to="/cities" className="navigate-button">Go to Cities Table</Link>
    </div>
  );
};

export default LandingPage;
