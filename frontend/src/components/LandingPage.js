import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="landing-container">
      <section className="hero">
        <h1 className="hero-title">
          Unlock Your Best Academic Self with GradeHabits
        </h1>
        <p className="hero-subtitle">
          Understand how your daily habits influence your grades; get thoughtful
          insights and tailored advice to help you thrive.
        </p>
        <button
          className="btn-primary start-survey-btn"
          onClick={() => navigate("/survey")}
          aria-label="Begin your habit survey"
        >
          Begin Your Habit Survey
        </button>
      </section>

      <section className="how-it-works">
        <div className="steps">
          <article className="step">
            <div className="step-icon" aria-hidden="true">🛏️</div>
            <h3>Tell Us About Your Habits</h3>
            <p>
              A quick and easy survey about your daily routines; sleep, study,
              screen time, and more.
            </p>
          </article>
          <article className="step">
            <div className="step-icon" aria-hidden="true">🔍</div>
            <h3>Discover Your Academic Impact</h3>
            <p>
              Our AI gently analyzes your habits to predict how they affect your
              GPA.
            </p>
          </article>
          <article className="step">
            <div className="step-icon" aria-hidden="true">💡</div>
            <h3>Receive Practical Tips</h3>
            <p>
              Personalized suggestions designed to fit your lifestyle and help you
              improve.
            </p>
          </article>
        </div>
      </section>

      <section className="why-gradehabits">
        <h2>Why GradeHabits?</h2>
        <ul>
          <li><strong>Data-Driven:</strong> Insights based on real research and student data.</li>
          <li><strong>Easy & Quick:</strong> Simple survey and clear results.</li>
          <li><strong>Personalized:</strong> Advice crafted just for your habits and goals.</li>
          <li><strong>Privacy First:</strong> Your data is secure and confidential.</li>
        </ul>
      </section>

      <section className="final-encouragement">
        <p>
          Take the first step to a smarter, healthier study routine. Click below
          to start your free survey and unlock your academic potential!
        </p>
      </section>
    </main>
  );
}
