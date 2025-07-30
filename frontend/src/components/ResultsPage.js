import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultsPage.css";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get backend response from navigation state
  const result = location.state?.result;
  const predictedGPA = result?.prediction;
  const aiResponse = result?.responseFromAI;

  // If no prediction data, prompt to take survey
  if (predictedGPA === undefined) {
    return (
      <div className="results-container no-data">
        <h2>No Results Available</h2>
        <p>Please complete the survey first to see your results.</p>
        <button onClick={() => navigate("/survey")}>Go to Survey</button>
      </div>
    );
  }

  // Color code GPA for visualization
  const gpaColor =
    predictedGPA >= 3.5 ? "#4caf50" : predictedGPA >= 2.5 ? "#ff9800" : "#f44336";

  return (
    <div className="results-container">
      <h2>Your Predicted GPA</h2>
      <p className="gpa" style={{ color: gpaColor }}>
        {Number(predictedGPA).toFixed(2)}
      </p>

      <h3>Personalized Feedback</h3>
      <p className="feedback">{aiResponse || "Keep up the great work and continue improving!"}</p>

      <div className="results-buttons">
        <button onClick={() => navigate("/survey")}>Retake Survey</button>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}
