import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import SurveyForm from "./components/SurveyForm";
import ResultsPage from "./components/ResultsPage";
import AboutPage from "./components/AboutPage"; // Optional

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}
