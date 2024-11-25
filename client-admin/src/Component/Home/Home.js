import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log('Đăng xuất thành công');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Trang chủ admin</div>
        <div className="left-section">
          {!isMenuOpen && (
            <div className="menu-button" onClick={toggleMenu}>
              <span>☰</span> Menu
            </div>
          )}
          {isMenuOpen && (
            <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
              <button className="close-button" onClick={toggleMenu}>
                ✖ Đóng
              </button>
              <ul className="menu-list">
                <li onClick={() => navigate('/')}>Dashboard</li>
                <li onClick={() => navigate('/products')}>Quản lý sản phẩm</li>
                <li onClick={() => navigate('/categories')}>Quản lý mục lục</li>
                <li onClick={() => navigate('/users')}>Quản lý người dùng</li>
                <li onClick={() => navigate('/orders')}>Quản lý đơn hàng</li>
              </ul>
            </div>
          )}
        </div>
        <div className="user-menu">
          <div
            className="user-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              alt="User Icon"
              className="user-avatar"
            />
          </div>
          {dropdownOpen && (
            <div className="user-dropdown">
              <button
                className="dropdown-button"
                onClick={() => navigate('/users')}
              >
                Chỉnh sửa người dùng
              </button>
              <button className="dropdown-button" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Dashboard Section */}
      <main className="dashboard">
        <h1>Dashboard</h1>
        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Tổng sản phẩm</h3>
            <p>100</p>
          </div>
          <div className="widget">
            <h3>Tổng danh mục</h3>
            <p>20</p>
          </div>
          <div className="widget">
            <h3>Tổng người dùng</h3>
            <p>50</p>
          </div>
          <div className="widget">
            <h3>Đơn hàng đang xử lý</h3>
            <p>15</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
