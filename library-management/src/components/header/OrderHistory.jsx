import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // chi tiết đơn
  const [showDetail, setShowDetail] = useState(false); // modal
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Lấy danh sách đơn hàng của customer
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/admin/customer/orders/${user.name}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Fetch order history error:", err);
      }
    };
    fetchOrders();
  }, [user]);

  // Lấy chi tiết đơn
  const fetchOrderDetail = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/admin/order-by-id/${id}`
      );
      setSelectedOrder(res.data[0]); // API trả mảng
      setShowDetail(true);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

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
        <div style={{ maxHeight: "655px", overflowY: "auto" }}>
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
                {parseFloat(order.total_amount).toLocaleString("vi-VN")} đ |{" "}
                <strong>Trạng thái:</strong> {order.status}
              </div>

              {/* Nút xem chi tiết */}
              <button
                style={{
                  marginTop: "8px",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => fetchOrderDetail(order.id)}
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal chi tiết đơn */}
 {showDetail && selectedOrder && (
  <div className="history-modal-overlay">
    <div className="history-modal-content">
      <div className="history-modal-header">
        Chi tiết đơn #{selectedOrder.id}
      </div>
      <div className="history-modal-body">
        <p><b>Khách hàng:</b> {selectedOrder.customer?.name}</p>
        <p><b>Bàn:</b> {selectedOrder.table?.table_number}</p>
        <p><b>Nhân viên:</b> {selectedOrder.user?.name}</p>
        <p><b>Tổng tiền:</b> {Number(selectedOrder.total_amount).toLocaleString("vi-VN")} đ</p>
        <p><b>Trạng thái:</b> {selectedOrder.status}</p>

        <div className="history-section-title">Món ăn</div>
        <ul>
          {selectedOrder.details.map((d, i) => (
            <li key={i}>
              <span>{d.dish?.name} (SL: {d.quantity})</span>
              <span>{Number(d.price).toLocaleString("vi-VN")} đ</span>
            </li>
          ))}
        </ul>

        <div className="history-section-title">Thanh toán</div>
        <ul>
          {selectedOrder.payments.map((p, i) => (
            <li key={i}>
              <span>{p.method}</span>
              <span>{Number(p.amount).toLocaleString("vi-VN")} đ</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="history-modal-footer">
        <button onClick={() => setShowDetail(false)}>Đóng</button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
