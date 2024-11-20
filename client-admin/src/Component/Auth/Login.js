import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import thêm useLocation
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin route hiện tại

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu!");
    } else {
      console.log("Đăng nhập thành công với email:", email);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2
          className={location.pathname === "/login" ? "active-link" : "switch-link"}
          onClick={() => navigate("/login")}
        >
          Already Registered?
        </h2>
        <h2
          className={location.pathname === "/register" ? "active-link" : "switch-link"}
          onClick={() => navigate("/register")}
        >
          Create Your Account
        </h2>
      </div>
      <div className="login-box">
        <p>If you are already registered with Nhom3, login here:</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="email">Email address*</label>
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password*</label>
            <span
              className="show-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <a href="#" className="forgot-password">
            Forgot your password?
          </a>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
