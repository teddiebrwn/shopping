import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Register.css";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMismatchAlert, setShowMismatchAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !phone ||
      !birthday ||
      !username ||
      !role ||
      !gender ||
      !address ||
      !city ||
      !country ||
      !password ||
      !confirmPassword
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
    } else if (password !== confirmPassword) {
      setShowMismatchAlert(true);
    } else {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/register", {
          name,
          email,
          phone,
          birthday,
          username,
          role,
          gender,
          address,
          city,
          country,
          password,
        });
        console.log("Đăng ký thành công:", response.data);
        alert("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
        navigate("/login");
      } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        alert("Đăng ký thất bại. Vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
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
      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="name">Name*</label>
          </div>
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
              type="text"
              id="birthday"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="birthday">Birthday*</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="username">Username*</label>
          </div>
          <div className={`input-group ${role ? "active" : ""}`}>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled hidden></option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <label htmlFor="role">Role*</label>
          </div>
          <div className="gender-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Male</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Female</span>
            </label>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="address">Address*</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="city">City*</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="country">Country*</label>
          </div>
          <div className="input-group">
            <input
              type="password"
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
          <button type="submit" className="register-button">
            REGISTER
          </button>
        </form>
      </div>
      {showMismatchAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <h2>Thông báo</h2>
            <p>Mật khẩu không trùng khớp</p>
            <button className="alert-button" onClick={() => setShowMismatchAlert(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
