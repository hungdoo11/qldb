import React, { useState } from "react";
import "./admin.css";

export default function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const orders = [
    {
      id: "OD001",
      customer: "Nguyễn Văn A",
      phone: "0901234567",
      status: "Chờ xác nhận",
      items: [
        { name: "Lẩu Thái", qty: 1, price: 250000 },
        { name: "Bò nướng", qty: 2, price: 150000 },
        { name: "Nước ngọt", qty: 3, price: 20000 },
      ],
    },
    {
      id: "OD002",
      customer: "Trần Thị B",
      phone: "0909876543",
      status: "Đang giao",
      items: [
        { name: "Gà rán", qty: 2, price: 120000 },
        { name: "Coca", qty: 2, price: 15000 },
      ],
    },
    {
      id: "OD003",
      customer: "Lê Văn C",
      phone: "0911222333",
      status: "Hoàn thành",
      items: [
        { name: "Pizza Hải sản", qty: 1, price: 200000 },
        { name: "Pepsi", qty: 3, price: 18000 },
      ],
    },
  ];

  return (
    <div className="">
      <h2 className="admin-title">Danh sách đơn hàng</h2>
      <div className="admin-container">
        <div className="orders-grid">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + item.qty * item.price,
              0
            );

            return (
              <div
                key={order.id}
                className="order-card"
                onClick={() => {
                  setSelectedOrder(order);
                  setIsOpen(true);
                }}
              >
                <p><strong>Mã đơn:</strong> {order.id}</p>
                <p><strong>Khách hàng:</strong> {order.customer}</p>
                <p><strong>Số điện thoại:</strong> {order.phone}</p>
                <p><strong>Trạng thái:</strong> {order.status}</p>
                <p><strong>Tổng cộng:</strong> {total.toLocaleString()} đ</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal hiển thị chi tiết */}
      {isOpen && selectedOrder && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()} // tránh tắt khi click bên trong
          >
            <h2>Chi tiết đơn hàng</h2>
            <p><b>Mã đơn:</b> {selectedOrder.id}</p>
            <p><b>Khách hàng:</b> {selectedOrder.customer}</p>
            <p><b>Số điện thoại:</b> {selectedOrder.phone}</p>
            <p><b>Trạng thái:</b> {selectedOrder.status}</p>

            <h3>Danh sách món ăn</h3>
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
                {selectedOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.price.toLocaleString()} đ</td>
                    <td>{(item.qty * item.price).toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="order-actions">
              <button className="btn-confirm">Xác nhận</button>
              <button className="btn-back" onClick={() => setIsOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
