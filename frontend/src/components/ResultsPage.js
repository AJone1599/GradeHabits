import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultsPage.css";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve passed survey data and predicted GPA from location state
  const { formData, predictedGPA, feedback } = location.state || {};

  // Simple GPA color coding
  const gpaColor =
    predictedGPA >= 3.5
      ? "#4caf50" // green
      : predictedGPA >= 2.5
      ? "#ff9800" // orange
      : "#f44336"; // red

  // If no data, prompt to do survey
  if (!formData || predictedGPA === undefined) {
    return (
      <div className="results-container no-data">
        <h2>No Results Yet</h2>
        <p>Please complete the survey first.</p>
        <button onClick={() => navigate("/survey")}>Go to Survey</button>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2>Your Predicted GPA</h2>
      <p className="gpa" style={{ color: gpaColor }}>
        {predictedGPA.toFixed(2)}
      </p>

      <h3>Personalized Feedback</h3>
      <p className="feedback">{feedback || "Keep up your good habits and improve where you can!"}</p>

      <div className="results-buttons">
        <button onClick={() => navigate("/survey")}>Retake Survey</button>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}

