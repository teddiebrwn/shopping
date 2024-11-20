import React, { useState } from "react";
import OrderForm from "./OrderForm";
import "./Orders.css";

function OrderList() {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Nguyễn Văn A", total: 500000, status: "Đang xử lý" },
    { id: 2, customer: "Trần Thị B", total: 200000, status: "Hoàn thành" },
  ]);
  const [editingOrder, setEditingOrder] = useState(null); // Trạng thái chỉnh sửa
  const [isFormOpen, setIsFormOpen] = useState(false); // Trạng thái mở/đóng form
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null }); // Trạng thái xác nhận xóa

  // Thêm đơn hàng
  const handleAddOrder = (newOrder) => {
    setOrders([...orders, { ...newOrder, id: Date.now() }]);
    setIsFormOpen(false);
  };

  // Sửa đơn hàng
  const handleEditOrder = (updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setEditingOrder(null);
    setIsFormOpen(false);
  };

  // Xóa đơn hàng
  const handleDeleteOrder = () => {
    setOrders(orders.filter((order) => order.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
  };

  // Mở form thêm/sửa
  const openForm = (order = null) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  return (
    <div className="orders-container">
      <h1>Quản lý đơn hàng</h1>
      <button className="add-button" onClick={() => openForm()}>
        Thêm đơn hàng
      </button>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}₫</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => openForm(order)}>Sửa</button>
                <button
                  onClick={() =>
                    setConfirmDelete({ show: true, id: order.id })
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
        <OrderForm
          order={editingOrder}
          onSave={editingOrder ? handleEditOrder : handleAddOrder}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* Hộp thoại xác nhận xóa */}
      {confirmDelete.show && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h2>Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa đơn hàng này?</p>
            <div className="confirm-actions">
              <button className="confirm-button" onClick={handleDeleteOrder}>
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

export default OrderList;
