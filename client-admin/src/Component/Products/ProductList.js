import React, { useState } from "react";
import ProductForm from "./ProductForm";
import "./Products.css";

function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: "Sản phẩm A", price: 100, categoryId: 1 },
    { id: 2, name: "Sản phẩm B", price: 200, categoryId: 2 },
  ]); // Thêm `categoryId` để liên kết danh mục
  const [categories] = useState([
    { id: 1, name: "Danh mục A" },
    { id: 2, name: "Danh mục B" },
  ]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null }); // Trạng thái xác nhận xóa

  // Thêm sản phẩm
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setIsFormOpen(false);
  };

  // Sửa sản phẩm
  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  // Xóa sản phẩm
  const handleDeleteProduct = () => {
    setProducts(products.filter((product) => product.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
  };

  // Mở form thêm/sửa
  const openForm = (product = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="products-container">
      <h1>Quản lý sản phẩm</h1>
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
                  categories.find((category) => category.id === product.categoryId)
                    ?.name || "Không có danh mục"
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
          categories={categories} // Truyền danh mục
          onSave={editingProduct ? handleEditProduct : handleAddProduct}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* Hộp thoại xác nhận xóa */}
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
  );
}

export default ProductList;
