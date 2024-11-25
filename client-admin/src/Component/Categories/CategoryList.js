import React, { useState, useEffect } from "react";
import CategoryForm from "./CategoryForm";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Trạng thái chỉnh sửa
  const [isFormOpen, setIsFormOpen] = useState(false); // Mở/đóng form
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const navigate = useNavigate();

  // Fetch categories from API on component load
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/admin/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log("Đăng xuất thành công");
    navigate("/login");
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi thêm danh mục");
      }

      const createdCategory = await response.json();
      setCategories([...categories, createdCategory]);
    } catch (error) {
      console.error(error.message);
    }

    setIsFormOpen(false);
  };

  const handleEditCategory = async (updatedCategory) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/category/${updatedCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật danh mục");
      }

      const updatedData = await response.json();
      setCategories(
        categories.map((category) =>
          category.id === updatedData.id ? updatedData : category
        )
      );
    } catch (error) {
      console.error(error.message);
    }

    setEditingCategory(null);
    setIsFormOpen(false);
  };

  const handleDeleteCategory = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/category/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi xóa danh mục");
      }

      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error(error.message);
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
                <li onClick={() => navigate("/")}>Dashboard</li>
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
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <table className="categories-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
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
        )}
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
