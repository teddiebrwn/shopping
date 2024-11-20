import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

function ProductForm({ product, categories, onSave, onCancel }) { // Thêm categories vào props
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái mở/đóng menu chính
  const [dropdownOpen, setDropdownOpen] = useState(false); // Trạng thái mở/đóng dropdown
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Trạng thái submenu đang được mở
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", price: "", categoryId: "" }); // Thêm categoryId vào state

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: "", price: "", categoryId: "" }); // Đặt giá trị mặc định cho categoryId
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.categoryId) { // Đảm bảo categoryId không rỗng
      onSave(formData);
    }
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index); // Đóng/mở submenu
  };

  return (
    <div className="form-overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>{product ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h2>
        <label>
          Tên sản phẩm:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Giá sản phẩm:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Danh mục:
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => ( // Hiển thị danh sách danh mục
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <div className="form-actions">
          <button type="submit">Lưu</button>
          <button type="button" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
