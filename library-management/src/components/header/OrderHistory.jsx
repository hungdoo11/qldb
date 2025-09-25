import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/admin/order`);
        // Lọc đơn theo user_id nếu cần
        const userOrders = res.data.filter(o => o.user_id === user.id);
        setOrders(userOrders);
      } catch (err) {
        console.error("Fetch order history error:", err);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <p>
          Vui lòng{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            đăng nhập
          </span>{" "}
          để xem lịch sử đơn hàng.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lịch sử đơn hàng của {user.name}</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào</p>
      ) : (
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <div>
                <strong>Mã đơn:</strong> {order.id} |{" "}
                <strong>Khách:</strong> {order.cus_name} |{" "}
                <strong>Người tạo:</strong> {order.u_name}
              </div>
              <div>
                <strong>Bàn:</strong> {order.table_id} |{" "}
                <strong>Thời gian:</strong>{" "}
                {new Date(order.order_time).toLocaleString()}
              </div>
              <div>
                <strong>Tổng tiền:</strong>{" "}
                {parseFloat(order.total_amount).toLocaleString()} đ |{" "}
                <strong>Trạng thái:</strong> {order.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
