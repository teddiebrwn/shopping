import React, { useState } from 'react';
import './UserMenu.css';

const UserMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="user-menu">
      <span onClick={toggleMenu}>User Icon</span>
      {menuOpen && (
        <div className="dropdown-menu">
          <a href="/profile">Edit Profile</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};


export default Menu;