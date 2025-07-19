import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const prediction = location.state?.prediction;

  return (
    <div>
      <h2>Results</h2>
      {prediction !== undefined ? (
        <p>Prediction: {prediction}</p>
      ) : (
        <p>No prediction available.</p>
      )}
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default ResultsPage;
