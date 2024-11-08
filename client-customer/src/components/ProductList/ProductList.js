// src/components/ProductList/ProductList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} className="product-link">
          <div className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}₫</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
