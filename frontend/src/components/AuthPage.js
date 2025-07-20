import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthPage() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="auth-container">
      <h2>{isAuthenticated ? "Welcome" : "Login"}</h2>

      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In / Sign Up</button>
      ) : (
        <>
          <p>Hello, {user.name}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
}
