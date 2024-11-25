import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    birthday: '',
    gender: 'male',
    address: '',
    city: '',
    country: '',
    role: 'user',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    const { username, email, password, name, birthday, address, city, country } = formData;

    // Kiểm tra thông tin rỗng
    if (!username || !email || !password || !name || !birthday || !address || !city || !country) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setErrorMessage('');
    setIsLoading(true); // Hiển thị trạng thái loading

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'user' }), // Mặc định role là user
      });

      const data = await response.json();
      setIsLoading(false); // Dừng trạng thái loading

      if (response.ok) {
        alert('Đăng ký thành công!');
        navigate('/login'); // Điều hướng tới trang đăng nhập
      } else {
        setErrorMessage(data.message || 'Đăng ký thất bại!'); // Hiển thị lỗi từ backend
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Lỗi kết nối. Vui lòng thử lại sau!');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>ĐĂNG KÝ</h2>
        <form>
          {/* Họ và tên */}
          <div className="form-group">
            <label htmlFor="name">Họ và tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          {/* Ngày sinh */}
          <div className="form-group">
            <label htmlFor="birthday">Ngày sinh:</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập Username"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div className="form-group">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {/* Giới tính */}
          <div className="form-group">
            <label htmlFor="gender">Giới tính:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Địa chỉ */}
          <div className="form-group">
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              required
            />
          </div>

          {/* Thành phố */}
          <div className="form-group">
            <label htmlFor="city">Thành phố:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Nhập thành phố"
              required
            />
          </div>

          {/* Quốc gia */}
          <div className="form-group">
            <label htmlFor="country">Quốc gia:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Nhập quốc gia"
              required
            />
          </div>

          {/* Hiển thị lỗi */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Hiển thị trạng thái đăng ký */}
          {isLoading ? (
            <p>Đang đăng ký...</p>
          ) : (
            <button type="button" onClick={handleRegister} className="register-button">
              Đăng ký
            </button>
          )}
        </form>
        <div className="extra-links">
          <a href="/login">Đã có tài khoản? Đăng nhập</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
