import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import "./Products.css";

function ProductList() {
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

  const [products, setProducts] = useState([
    { id: 1, name: "Sản phẩm A", price: 100, categoryId: 1 },
    { id: 2, name: "Sản phẩm B", price: 200, categoryId: 2 },
  ]);
  const [categories] = useState([
    { id: 1, name: "Danh mục A" },
    { id: 2, name: "Danh mục B" },
  ]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setIsFormOpen(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleDeleteProduct = () => {
    setProducts(products.filter((product) => product.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
  };

  const openForm = (product = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Quản lý sản phẩm</div>
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
      <div className="products-container">
        <button className="add-button" onClick={() => openForm()}>
          Thêm sản phẩm
        </button>
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}₫</td>
                <td>
                  {
                    categories.find(
                      (category) => category.id === product.categoryId
                    )?.name || "Không có danh mục"
                  }
                </td>
                <td>
                  <button onClick={() => openForm(product)}>Sửa</button>
                  <button
                    onClick={() =>
                      setConfirmDelete({ show: true, id: product.id })
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
          <ProductForm
            product={editingProduct}
            categories={categories}
            onSave={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
        {confirmDelete.show && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <span className="confirm-icon">⚠️</span>
              <h2>Xác nhận xóa</h2>
              <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
              <div className="confirm-actions">
                <button className="confirm-button" onClick={handleDeleteProduct}>
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

export default ProductList;
