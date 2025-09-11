import React from "react";
import "./admin.css";

export default function OrderDetail() {
  const order = {
    id: "OD001",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    status: "Chờ xác nhận",
    items: [
      { name: "Lẩu Thái", qty: 1, price: 250000 },
      { name: "Bò nướng", qty: 2, price: 150000 },
      { name: "Nước ngọt", qty: 3, price: 20000 },
    ],
  };

  const total = order.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Chi tiết đơn hàng</h2>

      <div className="order-detail-box">
        <p><strong>Mã đơn:</strong> {order.id}</p>
        <p><strong>Khách hàng:</strong> {order.customer}</p>
        <p><strong>Số điện thoại:</strong> {order.phone}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Trạng thái:</strong> {order.status}</p>
      </div>

      <h3 className="admin-subtitle">Danh sách món ăn</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Món ăn</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price.toLocaleString()} đ</td>
              <td>{(item.qty * item.price).toLocaleString()} đ</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-total">
        <p><strong>Tổng cộng:</strong> {total.toLocaleString()} đ</p>
      </div>

      <div className="order-actions">
        <button className="btn-confirm">Xác nhận</button>
        <button className="btn-back">Quay lại</button>
      </div>
    </div>
  );
}
