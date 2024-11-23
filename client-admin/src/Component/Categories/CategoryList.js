import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

function CategoryList() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Danh mục A" },
    { id: 2, name: "Danh mục B" },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Trạng thái chỉnh sửa
  const [isFormOpen, setIsFormOpen] = useState(false); // Mở/đóng form
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log("Đăng xuất thành công");
    navigate("/login");
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
    setIsFormOpen(false);
  };

  const handleEditCategory = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setEditingCategory(null);
    setIsFormOpen(false);
  };

  const handleDeleteCategory = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (isConfirmed) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const openForm = (category = null) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Quản lý danh mục</div>
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
                <li onClick={() => navigate("/categories")}>Quản lý danh mục</li>
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
      <div className="categories-container">
        <h1>Quản lý danh mục</h1>
        <button className="add-button" onClick={() => openForm()}>
          Thêm danh mục
        </button>
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <button onClick={() => openForm(category)}>Sửa</button>
                  <button onClick={() => handleDeleteCategory(category.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isFormOpen && (
          <CategoryForm
            category={editingCategory}
            onSave={editingCategory ? handleEditCategory : handleAddCategory}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default CategoryList;
