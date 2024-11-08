// src/components/Login/Login.js
import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>ĐĂNG NHẬP</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email"
            required
          />
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            placeholder="Mật khẩu"
            required
          />
          <button type="submit">Đăng nhập</button>
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
