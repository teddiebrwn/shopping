// src/components/AccessoriesPage/AccessoriesPage.js
import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList/ProductList';

function AccessoriesPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Tạm thời sử dụng dữ liệu mock cho phát triển
    const mockData = [
      { id: 1, name: 'Accessory Product 1', price: '500,000', image: 'https://via.placeholder.com/400', description: 'Description for accessory product 1' },
      { id: 2, name: 'Accessory Product 2', price: '600,000', image: 'https://via.placeholder.com/400', description: 'Description for accessory product 2' }
    ];
    setProducts(mockData);
  }, []);

  return (
    <div>
      <h2>Accessories Products</h2>
      <ProductList products={products} />
    </div>
  );
}

export default AccessoriesPage;
