// src/components/ProductList/ProductList.js
import React from 'react';
import './ProductList.css';

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}₫</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
