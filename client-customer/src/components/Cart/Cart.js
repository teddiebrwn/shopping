import React from 'react';
import './Cart.css';

function Cart() {
  const cartItems = [
    { id: 1, name: 'Men Product 1', price: '600,000₫', quantity: 2, image: '/images/men-product-1.jpg' },
    { id: 2, name: 'Women Product 1', price: '700,000₫', quantity: 1, image: '/images/women-product-1.jpg' },
  ];

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseInt(item.price.replace(',', '').replace('₫', '')) * item.quantity, 0).toLocaleString() + '₫';
  };

  return (
    <div className="cart-page">
      <h2>Giỏ Hàng Của Bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn hiện đang trống.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Giá: {item.price}</p>
                <p>Số lượng: {item.quantity}</p>
                <button className="remove-item-button">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <h3>Tổng cộng: {getTotalPrice()}</h3>
        <button className="checkout-button">Thanh Toán</button>
      </div>
    </div>
  );
}

export default Cart;
