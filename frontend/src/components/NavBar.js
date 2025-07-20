import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.png"; // Adjust the path if your logo is in a different folder
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="GradeHabits Logo" className="logo-image" />
        GradeHabits
      </div>
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/survey"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Survey
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          About
        </NavLink>
        <NavLink
          to="/auth"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Login / Sign Up
        </NavLink>
      </div>
    </nav>
  );
}
