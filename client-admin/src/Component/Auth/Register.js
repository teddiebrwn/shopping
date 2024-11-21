import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMismatchAlert, setShowMismatchAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !phone || !password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
    } else if (password !== confirmPassword) {
        setShowMismatchAlert(true);
    } else {
      console.log("Đăng ký thành công với email:", email, "và phone:", phone);
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
        <p>If you want to create an account with Nhom3, register here:</p>
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
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="phone">Phone*</label>
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
          </div>
          <div className="input-group">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="confirmPassword">Confirm Password*</label>
          </div>
          <button type="submit" className="login-button">
            REGISTER
          </button>
        </form>
      </div>
      {showMismatchAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <h2>Thông báo</h2>
            <p>Bạn nhập không trùng mật khẩu</p>
            <button className="alert-button" onClick={() => setShowMismatchAlert(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
