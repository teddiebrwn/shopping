import React, { useState } from "react";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import "./Users.css";

function UserList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const handleLogout = () => {
    console.log("Đăng xuất thành công");
    navigate("/login");
  };

  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "vana@example.com", role: "Admin" },
    { id: 2, name: "Trần Thị B", email: "thib@example.com", role: "User" },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setIsFormOpen(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
    setIsFormOpen(false);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
  };

  const openForm = (user = null) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Quản lý người dùng</div>
        <div className="left-section">
          {!isMenuOpen && (
            <div className="menu-button" onClick={toggleMenu}>
              <span>☰</span> Menu
            </div>
          )}
          {isMenuOpen && (
            <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
              <button className="close-button" onClick={toggleMenu}>
                ✖ Đóng
              </button>
              <ul className="menu-list">
                <li onClick={() => navigate('/')}>Dashboard</li>
                <li onClick={() => navigate("/products")}>Quản lý sản phẩm</li>
                <li onClick={() => navigate("/categories")}>Quản lý mục lục</li>
                <li onClick={() => navigate("/users")}>Quản lý người dùng</li>
                <li onClick={() => navigate("/orders")}>Quản lý đơn hàng</li>
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
                onClick={() => navigate("/users")}
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
      <div className="users-container">
        <button className="add-button" onClick={() => openForm()}>
          Thêm người dùng
        </button>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => openForm(user)}>Sửa</button>
                  <button
                    onClick={() =>
                      setConfirmDelete({ show: true, id: user.id })
                    }
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isFormOpen && (
          <UserForm
            user={editingUser}
            onSave={editingUser ? handleEditUser : handleAddUser}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
        {confirmDelete.show && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <h2>Xác nhận xóa</h2>
              <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
              <div className="confirm-actions">
                <button className="confirm-button" onClick={handleDeleteUser}>
                  Xóa
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setConfirmDelete({ show: false, id: null })}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
