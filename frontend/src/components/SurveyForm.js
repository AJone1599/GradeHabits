import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyForm.css";

const cards = [
  {
    title: "🎓 Academic Background",
    questions: [
      {
        name: "age",
        type: "number",
        question: "How old are you?",
        required: true,
      },
      {
        name: "applicationOrder",
        type: "radio",
        question: "Was this major your first choice when applying?",
        options: [
          { label: "First choice", value: "1" },
          { label: "Second choice", value: "2" },
          { label: "Third choice", value: "3" },
          { label: "Fourth or later", value: "4+" }
        ],
        required: true,
      },
      {
        name: "previousQualifications",
        type: "number",
        question: "How many academic qualifications (e.g., diplomas, certificates) did you earn before starting this program?",
        required: true,
      }
    ],
  },
  {
    title: "📖 Study Habits & Class Attendance",
    questions: [
      {
        name: "studyTimeWeek",
        type: "number",
        question: "On average, how many hours per week do you study outside of class?",
        required: true,
      },
      {
        name: "attendance",
        type: "number",
        question: "Roughly how many classes do you attend per month?",
        required: true,
      },
      {
        name: "daytimeEveningClasses",
        type: "radio",
        question: "Are most of your classes scheduled during the daytime or in the evening?",
        options: [
          { label: "Daytime", value: "0" },
          { label: "Evening", value: "1" }
        ],
        required: true,
      }
    ],
  },
  {
    title: "🏃 Commitments Outside Class",
    questions: [
      {
        name: "work",
        type: "radio",
        question: "Do you currently work part-time during the semester?",
        options: [
          { label: "Yes", value: "1" },
          { label: "No", value: "0" }
        ],
        required: true,
      },
      {
        name: "extracurriculars",
        type: "radio",
        question: "Are you actively involved in any extracurricular activities?",
        options: [
          { label: "Yes", value: "1" },
          { label: "No", value: "0" }
        ],
        required: true,
      }
    ],
  },
  {
    title: "🧠 Health & Well-being",
    questions: [
      {
        name: "averageSleep",
        type: "number",
        question: "On average, how many hours do you sleep each day?",
        required: true,
      },
      {
        name: "entertainmentHours",
        type: "number",
        question: "How many hours per day do you spend on entertainment (e.g., video games, Netflix)?",
        required: true,
      },
      {
        name: "mentalHealth",
        type: "likert",
        question: "How would you rate your overall mental health this semester?",
        scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        scaleLabels: ["Best", "", "", "", "", "", "", "", "", "", "Worst"],
        required: true,
      }
    ],
  }
];

export default function SurveyForm() {
  const [currentCard, setCurrentCard] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateCard = () => {
    const card = cards[currentCard];
    const newErrors = {};

    card.questions.forEach(q => {
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

  const renderQuestion = q => {
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
              onChange={e => handleChange(q.name, e.target.value)}
            />
            {errors[q.name] && <p className="error">{errors[q.name]}</p>}
          </div>
        );

      case "radio":
        return (
          <div key={q.name} className="question-block">
            <label className="question-text">{q.question}</label>
            <div className="radio-options">
              {q.options.map(opt => (
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
          <span className="progress">
            {currentCard + 1} / {cards.length}
          </span>
          <button type="button" onClick={handleNext} disabled={loading}>
            {currentCard === cards.length - 1 ? (loading ? "Submitting..." : "Submit") : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
