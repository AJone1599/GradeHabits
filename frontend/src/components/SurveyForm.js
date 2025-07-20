import React, { useState } from "react";
import "./SurveyForm.css";

// 1️⃣ Import the JSON you created
import surveyData from "../data/surveyQuestions.json";

// 2️⃣ Use its `cards` array
const cards = surveyData.cards;

export default function SurveyForm() {
  const [currentCard, setCurrentCard] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateCard = () => {
    const card = cards[currentCard];
    const newErrors = {};

    card.questions.forEach((q) => {
      if (q.required && (formData[q.name] === undefined || formData[q.name] === "")) {
        newErrors[q.name] = "This question is required";
      }
      // Additional validation for number input type
      if (
        q.type === "number" &&
        formData[q.name] !== undefined &&
        (isNaN(formData[q.name]) || formData[q.name] < 0)
      ) {
        newErrors[q.name] = "Please enter a valid positive number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCard()) return;
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/results");
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentCard > 0) setCurrentCard(currentCard - 1);
  };

  const renderQuestion = (q) => {
    switch (q.type) {
      case "number":
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

      case "radio":
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

      case "likert":
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

      default:
        return null;
    }

    return null;
  };

  return (
    <div className="survey-container" role="main" aria-labelledby="survey-heading">
      <h2 id="survey-heading" className="survey-title">
        {cards[currentCard].title}
      </h2>
      <form>
        {cards[currentCard].questions.map(renderQuestion)}
        <div className="form-navigation">
          <button type="button" onClick={handleBack} disabled={currentCard === 0}>
            Back
          </button>
          <span>
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

