import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", {
        emailOrUsername,
        password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email or Username:</label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Enter email or username"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => navigate("/auth/request-password-reset")}
        >
          Forgot Password?
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
