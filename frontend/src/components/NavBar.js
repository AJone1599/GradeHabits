import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./NavBar.css";

export default function NavBar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

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
        {/* Single Login/Sign Up link */}
        {isAuthenticated ? (
          <button
            className="nav-link nav-button"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
        ) : (
          <button
            className="nav-link nav-button"
            onClick={() => loginWithRedirect()}
          >
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}
