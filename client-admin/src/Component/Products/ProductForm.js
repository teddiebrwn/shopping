import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

function ProductForm({ product, categories, onSave, onCancel }) { 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", price: "", categoryId: "" }); 

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: "", price: "", categoryId: "" }); 
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.categoryId) {
      onSave(formData);
    }
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index); 
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
            {categories.map((category) => ( 
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
