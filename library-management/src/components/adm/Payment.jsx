import React, { useState } from "react";
import "./admin.css";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const orderDetails = {
    orderId: "HD001",
    customerName: "Nguyễn Văn A",
    phone: "0987654321",
    table: "Bàn 5",
    items: [
      { name: "Phở bò", qty: 2, price: 50000 },
      { name: "Cà phê sữa", qty: 1, price: 30000 },
      { name: "Nước cam", qty: 1, price: 25000 },
    ],
  };

  const totalPrice = orderDetails.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div className="payment-container">
      {/* Thông tin đơn hàng */}
      <div className="order-info">
        <h2>Thông tin đơn hàng</h2>
        <p><strong>Mã đơn:</strong> {orderDetails.orderId}</p>
        <p><strong>Khách hàng:</strong> {orderDetails.customerName}</p>
        <p><strong>SĐT:</strong> {orderDetails.phone}</p>
        <p><strong>Bàn:</strong> {orderDetails.table}</p>

        <table>
          <thead>
            <tr>
              <th>Món</th>
              <th>SL</th>
              <th>Giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price.toLocaleString()} đ</td>
                <td>{(item.qty * item.price).toLocaleString()} đ</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          <h3>Tổng cộng: {totalPrice.toLocaleString()} đ</h3>
        </div>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className="payment-method">
        <h2>Phương thức thanh toán</h2>
        <div className="method-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Tiền mặt (Cash)
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Thẻ (Card)
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="transfer"
              checked={paymentMethod === "transfer"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Chuyển khoản (Transfer)
          </label>
        </div>

        <button className="btn-confirm">Xác nhận thanh toán</button>
      </div>
    </div>
  );
};

export default Payment;
