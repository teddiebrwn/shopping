import React, { useState, useEffect } from "react";
import "./Categories.css";

function CategoryForm({ category, onSave, onCancel }) {
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({ name: "" });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name) {
      onSave(formData);
    }
  };

  return (
    <div className="form-overlay">
      <form className="category-form" onSubmit={handleSubmit}>
        <h2>{category ? "Sửa danh mục" : "Thêm danh mục"}</h2>
        <label>
          Tên danh mục:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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

export default CategoryForm;
