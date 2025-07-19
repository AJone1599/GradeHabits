import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SurveyPage() {
  const [features, setFeatures] = useState([0, 0, 0]);
  const navigate = useNavigate();

  const handleChange = (i, val) => {
    const newFeatures = [...features];
    newFeatures[i] = parseFloat(val);
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features }),
    });
    const data = await res.json();
    navigate('/results', { state: { prediction: data.prediction } });
  };

  return (
    <div>
      <h2>Survey</h2>
      <form onSubmit={handleSubmit}>
        {features.map((f, i) => (
          <input
            key={i}
            type="number"
            value={f}
            onChange={(e) => handleChange(i, e.target.value)}
            required
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SurveyPage;
