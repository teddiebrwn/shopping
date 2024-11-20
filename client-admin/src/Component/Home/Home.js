import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái mở/đóng menu chính
  const [dropdownOpen, setDropdownOpen] = useState(false); // Trạng thái mở/đóng dropdown
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Trạng thái submenu đang được mở
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Đóng/mở menu chính
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index); // Đóng/mở submenu
  };

  const handleLogout = () => {
    console.log('Đăng xuất thành công');
    navigate('/login'); // Chuyển hướng về trang đăng nhập
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
    </div>
  );
}

export default Home;
