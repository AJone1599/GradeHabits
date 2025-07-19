import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="main-content">
      <h1>Welcome to GradeHabits</h1>
      <p>
        Track your daily habits and get AI-powered predictions on your academic
        performance.
      </p>
      <Link to="/survey">
        <button>Start Survey</button>
      </Link>
    </div>
  );
}
