import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyForm.css";

export default function SurveyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sleepHours: "",
    phoneUsage: "",
    alcoholConsumption: "",
    studyHours: "",
    mentalHealth: "",
  });

  const [errors, setErrors] = useState({});

  // Basic validation
  const validate = () => {
    const errs = {};
    if (
      formData.sleepHours === "" ||
      formData.sleepHours < 0 ||
      formData.sleepHours > 24
    )
      errs.sleepHours = "Sleep hours must be between 0 and 24";
    if (
      formData.phoneUsage === "" ||
      formData.phoneUsage < 0 ||
      formData.phoneUsage > 24
    )
      errs.phoneUsage = "Phone usage must be between 0 and 24";
    if (
      formData.alcoholConsumption === "" ||
      formData.alcoholConsumption < 0 ||
      formData.alcoholConsumption > 100
    )
      errs.alcoholConsumption = "Alcohol consumption must be between 0% and 100%";
    if (
      formData.studyHours === "" ||
      formData.studyHours < 0 ||
      formData.studyHours > 24
    )
      errs.studyHours = "Study hours must be between 0 and 24";
    if (
      formData.mentalHealth === "" ||
      formData.mentalHealth < 1 ||
      formData.mentalHealth > 5
    )
      errs.mentalHealth = "Mental health rating must be between 1 and 5";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      sleepHours: "",
      phoneUsage: "",
      alcoholConsumption: "",
      studyHours: "",
      mentalHealth: "",
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // For now, navigate to results page (you can add backend call here)
    navigate("/results", { state: { formData } });
  };

  return (
    <div className="survey-container">
      <h2>Student Habit Survey</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Sleep Hours (0–24):
          <input
            type="number"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
            min="0"
            max="24"
            step="0.1"
            required
          />
          {errors.sleepHours && (
            <p className="error">{errors.sleepHours}</p>
          )}
        </label>

        <label>
          Phone Usage (hours, 0–24):
          <input
            type="number"
            name="phoneUsage"
            value={formData.phoneUsage}
            onChange={handleChange}
            min="0"
            max="24"
            step="0.1"
            required
          />
          {errors.phoneUsage && (
            <p className="error">{errors.phoneUsage}</p>
          )}
        </label>

        <label>
          Alcohol Consumption (% of days per month):
          <input
            type="number"
            name="alcoholConsumption"
            value={formData.alcoholConsumption}
            onChange={handleChange}
            min="0"
            max="100"
            step="1"
            required
          />
          {errors.alcoholConsumption && (
            <p className="error">{errors.alcoholConsumption}</p>
          )}
        </label>

        <label>
          Study Hours (0–24):
          <input
            type="number"
            name="studyHours"
            value={formData.studyHours}
            onChange={handleChange}
            min="0"
            max="24"
            step="0.1"
            required
          />
          {errors.studyHours && (
            <p className="error">{errors.studyHours}</p>
          )}
        </label>

        <label>
          Mental Health Rating (1–5):
          <input
            type="number"
            name="mentalHealth"
            value={formData.mentalHealth}
            onChange={handleChange}
            min="1"
            max="5"
            step="1"
            required
          />
          {errors.mentalHealth && (
            <p className="error">{errors.mentalHealth}</p>
          )}
        </label>

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
