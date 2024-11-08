// src/components/OutwearPage/OutwearPage.js
import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList/ProductList';

function OutwearPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Tạm thời sử dụng dữ liệu mock cho phát triển
    const mockData = [
      { id: 1, name: 'Outwear Product 1', price: '800,000', image: 'https://via.placeholder.com/400', description: 'Description for outwear product 1' },
      { id: 2, name: 'Outwear Product 2', price: '900,000', image: 'https://via.placeholder.com/400', description: 'Description for outwear product 2' }
    ];
    setProducts(mockData);
  }, []);

  return (
    <div>
      <h2>Outwear Products</h2>
      <ProductList products={products} />
    </div>
  );
}

export default OutwearPage;
