import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyForm.css";

// Import the survey schema
import surveyData from "../data/surveyQuestions.json";
const cards = surveyData.cards;

export default function SurveyForm() {
  const [currentCard, setCurrentCard] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateCard = () => {
    const card = cards[currentCard];
    const newErrors = {};

    card.questions.forEach((q) => {
      const val = formData[q.name];
      if (q.required && (val === undefined || val === "")) {
        newErrors[q.name] = "This question is required";
      }
      if (q.type === "number" && val !== undefined) {
        const num = Number(val);
        if (isNaN(num) || num < 0) {
          newErrors[q.name] = "Please enter a valid positive number";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCard()) return;
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      return;
    }
    // On last card, submit the form
    handleSubmit();
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Convert number fields to numbers and ensure 'displaced' is always 0
    const payload = { ...formData, displaced: 0 };
    const numberFields = [
      "age",
      "application_order",
      "study_time_week",
      "evening_classes",
      "attendance",
      "extracurriculars",
      "previous_qualifications",
      "displaced",
      "entertainment_hours",
      "work",
      "average_sleep",
      "mental_health"
    ];
    numberFields.forEach((field) => {
      if (payload[field] !== undefined) {
        payload[field] = Number(payload[field]);
      }
    });
    console.log("Submitting payload:", payload);
    setLoading(true);
    fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        console.log("Backend response:", data);
        navigate("/results", { state: { result: data } });
      })
      .catch((err) => {
        setLoading(false);
        console.error("Submission error:", err);
      });
  };

  const handleBack = () => {
    if (currentCard > 0) setCurrentCard(currentCard - 1);
  };

  const renderQuestion = (q) => {
    if (q.type === "number") {
      return (
        <div key={q.name} className="question-block">
          <label htmlFor={q.name} className="question-text">
            {q.question}
          </label>
          <input
            id={q.name}
            name={q.name}
            type="number"
            min="0"
            value={formData[q.name] || ""}
            onChange={(e) => handleChange(q.name, e.target.value)}
          />
          {errors[q.name] && <p className="error">{errors[q.name]}</p>}
        </div>
      );
    }

    if (q.type === "radio") {
      return (
        <div key={q.name} className="question-block">
          <label className="question-text">{q.question}</label>
          <div className="radio-options">
            {q.options.map((opt) => (
              <label key={opt.value} className="radio-label">
                <input
                  type="radio"
                  name={q.name}
                  value={opt.value}
                  checked={formData[q.name] === opt.value}
                  onChange={() => handleChange(q.name, opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors[q.name] && <p className="error">{errors[q.name]}</p>}
        </div>
      );
    }

    if (q.type === "likert") {
      return (
        <div key={q.name} className="question-block likert-block">
          <label className="question-text">{q.question}</label>
          <div className="likert-options">
            {q.scale.map((val, i) => (
              <label key={val} className="likert-label">
                <input
                  type="radio"
                  name={q.name}
                  value={val}
                  checked={formData[q.name] === val}
                  onChange={() => handleChange(q.name, val)}
                />
                {q.scaleLabels[i] || val}
              </label>
            ))}
          </div>
          {errors[q.name] && <p className="error">{errors[q.name]}</p>}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="survey-container" role="main" aria-labelledby="survey-heading">
      <h2 id="survey-heading" className="survey-title">
        {cards[currentCard].title}
      </h2>
      <form onSubmit={handleSubmit}>
        {cards[currentCard].questions.map(renderQuestion)}
        <div className="form-navigation">
          <button type="button" onClick={handleBack} disabled={currentCard === 0}>
            Back
          </button>
          <span className="progress">
            {currentCard + 1} / {cards.length}
          </span>
          <button type="button" onClick={handleNext} disabled={loading}>
            {currentCard === cards.length - 1
              ? loading
                ? "Submitting..."
                : "Submit"
              : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
