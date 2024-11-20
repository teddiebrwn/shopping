import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import "./Categories.css";

function CategoryList() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Danh mục A" },
    { id: 2, name: "Danh mục B" },
  ]); // Danh sách danh mục
  const [editingCategory, setEditingCategory] = useState(null); // Trạng thái chỉnh sửa
  const [isFormOpen, setIsFormOpen] = useState(false); // Mở/đóng form

  // Thêm danh mục
  const handleAddCategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
    setIsFormOpen(false);
  };

  // Sửa danh mục
  const handleEditCategory = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setEditingCategory(null);
    setIsFormOpen(false);
  };

  // Xóa danh mục
  const handleDeleteCategory = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (isConfirmed) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  // Mở form thêm/sửa
  const openForm = (category = null) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  return (
    <div className="categories-container">
      <h1>Quản lý danh mục</h1>
      <button className="add-button" onClick={() => openForm()}>Thêm danh mục</button>
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
                <button onClick={() => handleDeleteCategory(category.id)}>Xóa</button>
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
  );
}

export default CategoryList;
