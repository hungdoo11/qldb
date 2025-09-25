import React, { useState, useEffect } from "react";
import api from "../api/Api";
import "./admin.css";
import axios from "axios";

export default function OrderList() {
  const [orders, setOrders] = useState([]);         // danh sách đơn hàng từ API
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Pagination + filter nếu muốn (hiện tại lấy tất cả)
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/admin/order", {
        params: {
          page: currentPage,
        },
      });
      setOrders(res.data.data || []);
      setLastPage(res.data.last_page || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      fetchOrders();
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder({ ...selectedOrder, status }); // cập nhật modal
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <h2 className="admin-title">Danh sách đơn hàng</h2>
      <div className="admin-container">
        <div className="orders-grid-order">
          {orders.map((order) => {
            const total = order.items
              ? order.items.reduce((sum, item) => sum + item.qty * item.price, 0)
              : 0;

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
                <p><strong>Khách hàng:</strong> {order.cus_name}</p>
                <p><strong>Bàn:</strong> {order.table?.table_number || "Chưa có"}</p>
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
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Chi tiết đơn hàng</h2>
            <p><b>Mã đơn:</b> {selectedOrder.id}</p>
            <p><b>Khách hàng:</b> {selectedOrder.cus_name}</p>
            <p><b>Bàn:</b> {selectedOrder.table?.table_number || "Chưa có"}</p>
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
                {selectedOrder.items?.map((item, idx) => (
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
              <button
                className="btn-confirm"
                onClick={() => updateStatus(selectedOrder.id, "Đang sử dụng")}
              >
                Xác nhận
              </button>
              <button className="btn-back" onClick={() => setIsOpen(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
