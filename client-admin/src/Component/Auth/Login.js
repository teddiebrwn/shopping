import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(""); // Lưu lỗi từ server

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Vui lòng nhập email và mật khẩu!");
        return;
      }
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      console.log("Đăng nhập thành công:", response.data);
      alert("Đăng nhập thành công!");
      navigate("/dashboard"); // Điều hướng đến dashboard hoặc trang khác sau khi đăng nhập thành công
    } catch (error) {
      setError(error.response?.data?.message || "Đã xảy ra lỗi khi đăng nhập!");
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        alert("Vui lòng nhập email để nhận hướng dẫn đặt lại mật khẩu!");
        return;
      }
      await axios.post("http://localhost:3000/api/auth/request-password-reset", {
        email,
      });
      alert("Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.");
    } catch (error) {
      setError(error.response?.data?.message || "Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2
          className={location.pathname === "/login" ? "active-link" : ""}
          onClick={() => navigate("/login")}
        >
          Already Registered?
        </h2>
        <h2
          className={location.pathname === "/register" ? "active-link" : ""}
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
          <button type="button" className="forgot-password" onClick={handleForgotPassword}>
            Forgot your password?
          </button>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
