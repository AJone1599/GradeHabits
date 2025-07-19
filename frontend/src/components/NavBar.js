import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"; // We'll add styles here

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">GradeHabits</div>
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/survey"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Survey
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}


