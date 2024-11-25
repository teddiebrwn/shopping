import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMismatchAlert, setShowMismatchAlert] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !phone || !password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
    } else if (password !== confirmPassword) {
      setShowMismatchAlert(true);
    } else {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/register", {

          email,
          phone,

          password,
        });
        console.log("Đăng ký thành công:", response.data);
        alert("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
        setIsVerificationStep(true);
      } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        alert("Đăng ký thất bại. Vui lòng thử lại!");
      }
    }
  };
  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/verify", {
        email,
        code: verificationCode,
      });

      console.log("Xác thực thành công:", response.data);
      alert("Xác thực thành công! Tài khoản của bạn đã được kích hoạt.");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi xác thực:", error);
      alert("Xác thực thất bại. Vui lòng thử lại!");
    }
  };
  const handleResendCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/resend-verification", {
        email,
      });

      console.log("Đã gửi lại mã xác thực:", response.data);
      alert("Mã xác thực đã được gửi lại. Vui lòng kiểm tra email của bạn.");
    } catch (error) {
      console.error("Lỗi khi gửi lại mã xác thực:", error);
      alert("Không thể gửi lại mã xác thực. Vui lòng thử lại!");
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
            <p>Mật khẩu không trùng khớp</p>
            <button className="alert-button" onClick={() => setShowMismatchAlert(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
