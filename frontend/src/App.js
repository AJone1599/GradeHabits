import { useState } from 'react';

function App() {
  const [features, setFeatures] = useState([0, 0, 0]);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (i, val) => {
    const newFeatures = [...features];
    newFeatures[i] = parseFloat(val);
    setFeatures(newFeatures);
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features }),
    });
    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div>
      <h1>ML Predictor</h1>
      {features.map((f, i) => (
        <input
          key={i}
          type="number"
          value={f}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}
      <button onClick={handleSubmit}>Predict</button>
      {prediction !== null && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default App;
