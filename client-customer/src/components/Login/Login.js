// src/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('Username');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    const identifier = 
      loginType === 'Username'
        ? username
        : loginType === 'Email'
        ? email
        : phone;
  
    const userData = {
      role: 'user', // Cố định là "user" nếu không cần lựa chọn
      identifier,
      password,
      twoFactorCode: '' // Để trống nếu không yêu cầu
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/users/loginUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('token', data.token); // Lưu token vào localStorage
        navigate('/homepage'); // Điều hướng tới trang chủ sau khi đăng nhập thành công
      } else {
        setErrorMessage(data.message || 'Đăng nhập thất bại!');
      }
    } catch (error) {
      setErrorMessage('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>ĐĂNG NHẬP</h2>
        <form>
          <div className="form-group">
            <label htmlFor="loginType">Chọn loại đăng nhập:</label>
            <select
              id="loginType"
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              className="login-select"
            >
              <option value="Username">Username</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
          </div>

          {loginType === 'Username' && (
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập Username"
                required
              />
            </div>
          )}

          {loginType === 'Email' && (
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                required
              />
            </div>
          )}

          {loginType === 'Phone' && (
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="button" onClick={handleLogin} className="login-button">
            Đăng nhập
          </button>
        </form>
        <div className="extra-links">
          <a href="/register">Đăng ký</a> &nbsp;•&nbsp;
          <a href="/forgot-password">Quên mật khẩu</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
