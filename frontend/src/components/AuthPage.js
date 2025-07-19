import React, { useState } from "react";
import "./AuthPage.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {isLogin ? (
        <>
          <h2>Login</h2>
          <form onSubmit={(e) => e.preventDefault()} className="auth-form">
            <label>Email</label>
            <input type="email" required placeholder="you@example.com" />
            <label>Password</label>
            <input type="password" required placeholder="Enter your password" />
            <button type="submit">Login</button>
          </form>
          <p className="toggle-text">
            Don't have an account?{" "}
            <button onClick={() => setIsLogin(false)} className="toggle-btn">
              Sign up
            </button>
          </p>
        </>
      ) : (
        <>
          <h2>Sign Up</h2>
          <form onSubmit={(e) => e.preventDefault()} className="auth-form">
            <label>Email</label>
            <input type="email" required placeholder="you@example.com" />
            <label>Password</label>
            <input type="password" required placeholder="Create a password" />
            <button type="submit">Sign Up</button>
          </form>
          <p className="toggle-text">
            Already have an account?{" "}
            <button onClick={() => setIsLogin(true)} className="toggle-btn">
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}
