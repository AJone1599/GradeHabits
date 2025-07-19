import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the ML Predictor App</h1>
      <Link to="/survey">
        <button>Start Survey</button>
      </Link>
    </div>
  );
}

export default HomePage;
