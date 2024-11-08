// src/components/AllProductsPage/index.js
import React from 'react';
import ProductList from '../ProductList/ProductList'; // Chỉnh sửa đường dẫn này

const allProducts = [
  // Các sản phẩm kết hợp
  { id: 1, name: 'Men Product 1', price: '600,000', image: '/images/men_product1.jpg' },
  { id: 2, name: 'Women Product 1', price: '650,000', image: '/images/women_product1.jpg' },
  { id: 3, name: 'Kids Product 1', price: '500,000', image: '/images/kids_product1.jpg' },
  { id: 4, name: 'Accessory 1', price: '300,000', image: '/images/accessory1.jpg' },
  { id: 5, name: 'Men Product 2', price: '600,000', image: '/images/men_product2.jpg' },
];

function AllProductsPage() {
  return (
    <div>
      <h2>All Products</h2>
      <ProductList products={allProducts} />
    </div>
  );
}

export default AllProductsPage;
