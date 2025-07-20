import React from "react";
import "./AboutPage.css";
import illustration from "../assets/habits.png"; // Update path & filename here

export default function AboutPage() {
  return (
    <main className="about-container" aria-labelledby="about-heading">
      <h1 id="about-heading">About GradeHabits</h1>

      <img
        src={illustration}
        alt="Student working on laptop surrounded by study icons"
        className="about-illustration"
      />

      <section className="about-intro">
        <p>
          GradeHabits empowers students by analyzing their daily habits and predicting academic
          performance using AI-driven insights. Complete a quick survey to receive personalized
          feedback that helps improve your study routines and well-being.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To provide accessible, data-driven tools that enable students to make better lifestyle choices,
          boosting both academic success and personal growth.
        </p>
      </section>
    </main>
  );
}
