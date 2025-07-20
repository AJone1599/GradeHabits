import React, { useState } from "react";
import "./SurveyForm.css";

const cards = [
  {
    title: "💤 Sleep & Rest",
    questions: [
      {
        name: "sleepHours",
        type: "radio",
        question: "How many hours of sleep do you usually get on a school night?",
        options: ["Less than 4", "4–5", "6–7", "8 or more"],
        required: true,
      },
      {
        name: "feelRested",
        type: "likert",
        question: "Do you feel rested when you wake up for class?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Never", "", "", "", "Always"],
        required: true,
      },
    ],
  },
  {
    title: "📖 Study Habits",
    questions: [
      {
        name: "studyHours",
        type: "number",
        question: "How many hours do you study outside of class per week?",
        required: true,
      },
      {
        name: "studyTechniques",
        type: "likert",
        question: "When you study, how often do you use techniques like flashcards, quizzes, or spaced repetition?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Never", "", "", "", "Always"],
        required: true,
      },
      {
        name: "studySchedule",
        type: "radio",
        question: "Do you have a regular study schedule?",
        options: ["Yes", "No", "Sometimes"],
        required: true,
      },
    ],
  },
  {
    title: "📱 Technology & Distractions",
    questions: [
      {
        name: "socialMediaHours",
        type: "radio",
        question: "How many hours per day do you spend on social media?",
        options: ["Less than 1", "1–3", "3–5", "More than 5"],
        required: true,
      },
      {
        name: "phoneDistraction",
        type: "likert",
        question: "Do you get distracted by your phone while studying?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Never", "", "", "", "Always"],
        required: true,
      },
    ],
  },
  {
    title: "🎓 Class Engagement",
    questions: [
      {
        name: "classAttendance",
        type: "radio",
        question: "How often do you attend your scheduled classes?",
        options: ["Always", "Most of the time", "Sometimes", "Rarely"],
        required: true,
      },
      {
        name: "classParticipation",
        type: "likert",
        question: "How often do you participate in class (ask questions, join discussions)?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Never", "", "", "", "Very often"],
        required: true,
      },
    ],
  },
  {
    title: "🧠 Mental & Physical Health",
    questions: [
      {
        name: "stressFrequency",
        type: "likert",
        question: "How often do you feel stressed or anxious during the semester?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Never", "", "", "", "All the time"],
        required: true,
      },
      {
        name: "exerciseFrequency",
        type: "radio",
        question: "How often do you exercise (e.g., walk, gym, sports)?",
        options: ["Never", "1–2 times/week", "3–4 times/week", "5+ times/week"],
        required: true,
      },
    ],
  },
  {
    title: "⏰ Time & Task Management",
    questions: [
      {
        name: "assignmentCompletion",
        type: "likert",
        question: "How often do you complete assignments before the deadline?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Never", "", "", "", "Always"],
        required: true,
      },
      {
        name: "usePlanner",
        type: "radio",
        question: "Do you use any tools or planners to manage your time?",
        options: ["Yes", "No"],
        required: true,
      },
      {
        name: "plannerDetails",
        type: "text",
        question: "If yes: Which one? (Optional)",
        required: false,
        dependsOn: "usePlanner",
        dependsValue: "Yes",
      },
    ],
  },
  {
    title: "🏠 Life Outside School",
    questions: [
      {
        name: "partTimeJob",
        type: "radio",
        question: "Do you work a part-time job during the semester?",
        options: ["Yes", "No"],
        required: true,
      },
      {
        name: "jobHours",
        type: "number",
        question: "If yes: How many hours per week?",
        required: false,
        dependsOn: "partTimeJob",
        dependsValue: "Yes",
      },
      {
        name: "studyEnvironment",
        type: "likert",
        question: "Do you live in a quiet and stable environment conducive to studying?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Not at all", "", "", "", "Very much"],
        required: true,
      },
    ],
  },
  {
    title: "📈 Self-Perception & Mindset",
    questions: [
      {
        name: "academicConfidence",
        type: "likert",
        question: "How confident are you in your ability to succeed academically?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Not confident", "", "", "", "Very confident"],
        required: true,
      },
      {
        name: "responseToBadGrade",
        type: "likert",
        question: "When you get a bad grade, how likely are you to try harder next time instead of giving up?",
        scale: [1, 2, 3, 4, 5],
        scaleLabels: ["Not likely", "", "", "", "Very likely"],
        required: true,
      },
    ],
  },
];


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
      // Submit survey here or show results
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("Survey submitted!");
        // Optionally reset or navigate elsewhere
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentCard > 0) setCurrentCard(currentCard - 1);
  };

  const renderQuestion = (q) => {
    if (q.type === "radio") {
      return (
        <fieldset key={q.name}>
          <legend>{q.question}</legend>
          {q.options.map((opt) => (
            <label key={opt} className="radio-label">
              <input
                type="radio"
                name={q.name}
                value={opt}
                checked={formData[q.name] === opt}
                onChange={() => handleChange(q.name, opt)}
              />
              {opt}
            </label>
          ))}
          {errors[q.name] && <p className="error">{errors[q.name]}</p>}
        </fieldset>
      );
    }

    if (q.type === "likert") {
      return (
        <fieldset key={q.name} className="likert-scale">
          <legend>{q.question}</legend>
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
                {q.scaleLabels ? q.scaleLabels[i] : val}
              </label>
            ))}
          </div>
          {errors[q.name] && <p className="error">{errors[q.name]}</p>}
        </fieldset>
      );
    }

    if (q.type === "number") {
      return (
        <label key={q.name} htmlFor={q.name}>
          {q.question}
          <input
            id={q.name}
            name={q.name}
            type="number"
            min="0"
            value={formData[q.name] || ""}
            onChange={(e) => handleChange(q.name, e.target.value)}
          />
          {errors[q.name] && <p className="error">{errors[q.name]}</p>}
        </label>
      );
    }

    return null;
  };

  return (
    <div className="survey-container" role="main" aria-labelledby="survey-heading">
      <h2 id="survey-heading">{cards[currentCard].title}</h2>
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
            {currentCard === cards.length - 1 ? (loading ? "Submitting..." : "Submit") : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

