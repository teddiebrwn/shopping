// src/components/MenPage/MenPage.js
import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList/ProductList';

function MenPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Tạm thời sử dụng dữ liệu mock
    const mockData = [
      { id: 1, name: 'Men Product 1', price: '600,000', image: 'https://via.placeholder.com/400', description: 'Description for men product 1' },
      { id: 2, name: 'Men Product 2', price: '700,000', image: 'https://via.placeholder.com/400', description: 'Description for men product 2' }
    ];
    setProducts(mockData);
  }, []);

  return (
    <div>
      <h2>Men Products</h2>
      <ProductList products={products} />
    </div>
  );
}

export default MenPage;