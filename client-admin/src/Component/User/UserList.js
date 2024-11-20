import React, { useState } from "react";
import UserForm from "./UserForm";
import "./Users.css";

function UserList() {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "vana@example.com", role: "Admin" },
    { id: 2, name: "Trần Thị B", email: "thib@example.com", role: "User" },
  ]);
  const [editingUser, setEditingUser] = useState(null); // Trạng thái chỉnh sửa
  const [isFormOpen, setIsFormOpen] = useState(false); // Trạng thái mở/đóng form
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null }); // Trạng thái xác nhận xóa

  // Thêm người dùng
  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setIsFormOpen(false);
  };

  // Sửa người dùng
  const handleEditUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
    setIsFormOpen(false);
  };

  // Xóa người dùng
  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
  };

  // Mở form thêm/sửa
  const openForm = (user = null) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  return (
    <div className="users-container">
      <h1>Quản lý người dùng</h1>
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

      {/* Hộp thoại xác nhận xóa */}
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
  );
}

export default UserList;
