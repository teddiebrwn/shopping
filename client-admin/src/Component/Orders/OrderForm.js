import React, { useState, useEffect } from "react";
import "./Orders.css";

function OrderForm({ order, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    customer: "",
    total: "",
    status: "",
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({ customer: "", total: "", status: "" });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.customer && formData.total && formData.status) {
      onSave(formData);
    }
  };

  return (
    <div className="form-overlay">
      <form className="order-form" onSubmit={handleSubmit}>
        <h2>{order ? "Sửa đơn hàng" : "Thêm đơn hàng"}</h2>
        <label>
          Khách hàng:
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tổng tiền:
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Trạng thái:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Chọn trạng thái</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Hủy">Hủy</option>
          </select>
        </label>
        <div className="form-actions">
          <button type="submit">Lưu</button>
          <button type="button" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
