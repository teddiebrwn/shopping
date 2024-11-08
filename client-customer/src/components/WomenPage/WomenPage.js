// src/components/WomenPage/WomenPage.js
import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList/ProductList';

function WomenPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Tạm thời sử dụng dữ liệu mock
    const mockData = [
      { id: 1, name: 'Women Product 1', price: '800,000', image: 'https://via.placeholder.com/400', description: 'Description for women product 1' },
      { id: 2, name: 'Women Product 2', price: '900,000', image: 'https://via.placeholder.com/400', description: 'Description for women product 2' }
    ];
    setProducts(mockData);
  }, []);

  return (
    <div>
      <h2>Women Products</h2>
      <ProductList products={products} />
    </div>
  );
}

export default WomenPage;