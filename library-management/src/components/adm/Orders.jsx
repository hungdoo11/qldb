import React, { useState } from "react";
import "./admin.css";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Nguyen Van A",
      phone: "0123456789",
      items: ["Phở bò", "Trà đá"],
      status: "Chờ xác nhận",
    },
    {
      id: 2,
      customer: "Tran Thi B",
      phone: "0987654321",
      items: ["Cơm gà"],
      status: "Đang sử dụng",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editItems, setEditItems] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const updateStatus = (id, status) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const handleEditItems = () => {
    setOrders(
      orders.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, items: editItems.split(",").map((i) => i.trim()) }
          : o
      )
    );
    setSelectedOrder({ ...selectedOrder, items: editItems.split(",") });
  };

  const handlePayment = () => {
    alert(
      `Thanh toán đơn #${selectedOrder.id} bằng ${paymentMethod || "chưa chọn"}`
    );
    setSelectedOrder(null);
    setPaymentMethod("");
  };

  return (
    <div className="orders-container">
      <h2>Quản lý Đơn hàng</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>SĐT</th>
            <th>Món ăn</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.phone}</td>
              <td>{o.items.join(", ")}</td>
              <td>
                <span
                  className={`status-badge ${
                    o.status === "Chờ xác nhận"
                      ? "pending"
                      : o.status === "Đang sử dụng"
                      ? "using"
                      : "confirmed"
                  }`}
                >
                  {o.status}
                </span>
              </td>
              <td>
                <button
                  className="btn view"
                  onClick={() => {
                    setSelectedOrder(o);
                    setEditItems(o.items.join(", "));
                  }}
                >
                  Xem
                </button>
                <button
                  className="btn confirm"
                  onClick={() => updateStatus(o.id, "Đang sử dụng")}
                >
                  Xác nhận
                </button>
                <button className="btn cancel" onClick={() => deleteOrder(o.id)}>
                  Hủy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>
            <p><b>Khách:</b> {selectedOrder.customer}</p>
            <p><b>SĐT:</b> {selectedOrder.phone}</p>
            <p><b>Món:</b> {selectedOrder.items.join(", ")}</p>
            <p><b>Trạng thái:</b> {selectedOrder.status}</p>

            <div className="edit-section">
              <input
                type="text"
                value={editItems}
                onChange={(e) => setEditItems(e.target.value)}
              />
              <button className="btn update" onClick={handleEditItems}>
                Cập nhật món
              </button>
            </div>

            {selectedOrder.status === "Đang sử dụng" && (
              <div className="payment-section">
                <h4>Chọn phương thức thanh toán:</h4>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">--Chọn--</option>
                  <option value="Tiền mặt">Cash</option>
                  <option value="Thẻ">Card</option>
                  <option value="Chuyển khoản">Transfer</option>
                </select>
                <button className="btn pay" onClick={handlePayment}>
                  Thanh toán
                </button>
              </div>
            )}

            <button className="btn close" onClick={() => setSelectedOrder(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
