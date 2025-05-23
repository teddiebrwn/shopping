import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import API from "../../api/api";
import "./Products.css";
import ProductForm from "./ProductForm";

function ProductList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await API.get("/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await API.get("/admin/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add or edit product
  const handleSaveProduct = async (product) => {
    try {
      if (product.id) {
        await API.put(`/admin/product/${product.id}`, product);
      } else {
        await API.post("/admin/product", product);
      }
      setIsFormOpen(false);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await API.delete(`/admin/product/${id}`);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Open form to add a new product
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  // Open form to edit an existing product
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  // Close form
  const handleCancel = () => {
    setIsFormOpen(false);
  };

  const handleLogout = () => {
    console.log("Đăng xuất thành công");
    navigate("/admin/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="products-container">
      <header className="home-header">
        <div className="logo">Trang chủ admin</div>
        <div className="left-section">
          {!isMenuOpen && (
            <div className="menu-button" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} /> Menu
            </div>
          )}
          {isMenuOpen && (
            <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
              <button className="close-button" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
              </button>
              <ul className="menu-list">
                <li onClick={() => navigate("/admin/home")}>Dashboard</li>
                <li onClick={() => navigate("/admin/products")}>Quản lý sản phẩm</li>
                <li onClick={() => navigate("/admin/categories")}>Quản lý mục lục</li>
                <li onClick={() => navigate("/admin/users")}>Quản lý người dùng</li>
                <li onClick={() => navigate("/admin/orders")}>Quản lý đơn hàng</li>
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
                onClick={() => navigate("/admin/users")}
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

      <main className="main-content">
        <h1>Quản lý sản phẩm</h1>
        <button className="add-button" onClick={handleAddProduct}>
          <FontAwesomeIcon icon={faPlus} /> Thêm sản phẩm
        </button>
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
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
                <td>{product.stock}</td>
                <td>
                  {categories.find((cat) => cat.id === product.categoryId)?.name ||
                    "Không xác định"}
                </td>
                <td>
                  <button
                    className="action-icon"
                    onClick={() => handleEditProduct(product)}
                  >
                    <FontAwesomeIcon icon={faEdit} title="Sửa" />
                  </button>
                  <button
                    className="action-icon"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} title="Xóa" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default ProductList;
