import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Header.css'

function Oder() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const handleOrder = async () => {
    if (cart.length === 0) return alert("Chưa có món nào!");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/orders", {
        table_id: 1,
        customer_name: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : "Khách lẻ",
        phone: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).phone : "0000000000",
        items: cart.map((item) => ({
          dish_id: item.id,
          price: item.price || 0,
          quantity: item.quantity,
        })),
      });

      console.log("Order response:", response.data);
      alert("Đặt món thành công!");
      navigate("/");
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert(
        "Có lỗi khi đặt món! Chi tiết: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="order-page">
      <h2>Đặt món</h2>
      {cart.length === 0 ? (
        <p>Chưa có món nào trong giỏ hàng.</p>
      ) : (
        <>
          {cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              {item.name} x {item.quantity} ={" "}
              {(parseFloat(item.price) * item.quantity).toFixed(0)}đ
            </div>
          ))}
          <div className="cart-total">
            Tổng:{" "}
            {cart
              .reduce(
                (total, item) => total + parseFloat(item.price) * item.quantity,
                0
              )
              .toFixed(0)}
            đ
          </div>
          <button onClick={handleOrder} className="order-btn">
            Xác nhận đặt món
          </button>
        </>
      )}
    </div>
  );
}

export default Oder;