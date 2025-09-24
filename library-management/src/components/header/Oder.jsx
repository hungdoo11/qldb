import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/Api";

function Oder({ cartt, clearCart }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(location.state?.cart || []);

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    setCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      deleteItem(index);
    }
    setCart(updated);
  };

  const deleteItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

const handleOrder = async () => {
  if (cart.length === 0) return alert("Chưa có món nào!");

  const total_amount = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const order_detail = JSON.stringify(
    cart.map((item) => ({
      dish_id: item.id,
      quantity: item.quantity,
      price: parseFloat(item.price) || 0,
    }))
  );

  try {
    await api.post("/order", {
      table_id: localStorage.getItem("tableId") ,
      customer_id: localStorage.getItem("customer_id") ,
      order_time: new Date().toISOString().slice(0, 19).replace("T", " "),
      total_amount,
      order_detail,
    });

    alert("✅ Đặt món thành công!");

      clearCart();
    navigate("/");
  } catch (err) {
    console.error("Order error:", err.response?.data || err.message);
    alert(
      "❌ Có lỗi khi đặt món! " +
        (err.response?.data?.message || err.message)
    );
  }
};


  const total = cart
    .reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    )
    .toLocaleString("vi-VN");

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Segoe UI, sans-serif",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "24px",
          fontSize: "1.8rem",
          color: "#333",
        }}
      >
        🍽️ Đặt món
      </h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777", fontSize: "1.1rem" }}>
          🛒 Chưa có món nào trong giỏ hàng.
        </p>
      ) : (
        <>
          {cart.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fafafa",
                borderRadius: "12px",
                padding: "12px",
                marginBottom: "14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ flex: 1, marginLeft: "15px" }}>
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    margin: "0 0 6px 0",
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    margin: "0 0 10px 0",
                    color: "#e63946",
                    fontWeight: 600,
                  }}
                >
                  {(parseFloat(item.price) * item.quantity).toLocaleString("vi-VN")}đ
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => decreaseQty(idx)}
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      background: "#f1f1f1",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#ddd")}
                    onMouseOut={(e) => (e.target.style.background = "#f1f1f1")}
                  >
                    −
                  </button>
                  <span style={{ fontSize: "1.1rem", minWidth: "20px" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(idx)}
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      background: "#f1f1f1",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#ddd")}
                    onMouseOut={(e) => (e.target.style.background = "#f1f1f1")}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => deleteItem(idx)}
                style={{
                  background: "#ff4d4f",
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
                onMouseOver={(e) => (e.target.style.background = "#d9363e")}
                onMouseOut={(e) => (e.target.style.background = "#ff4d4f")}
              >
                🗑️ Xóa
              </button>
            </div>
          ))}

          <div
            style={{
              textAlign: "right",
              fontSize: "1.3rem",
              fontWeight: 700,
              marginTop: "20px",
              borderTop: "2px solid #eee",
              paddingTop: "15px",
              color: "#333",
            }}
          >
            Tổng cộng: <span style={{ color: "#e63946" }}>{total}đ</span>
          </div>

          <button
            onClick={handleOrder}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "14px 0",
              background: "#28a745",
              color: "#fff",
              fontSize: "1.2rem",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
              letterSpacing: "0.5px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#218838")}
            onMouseOut={(e) => (e.target.style.background = "#28a745")}
          >
            Đặt món
          </button>
        </>
      )}
    </div>
  );
}

export default Oder;
