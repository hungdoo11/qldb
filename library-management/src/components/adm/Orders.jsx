import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null); // lưu chi tiết đơn
  const [showDetail, setShowDetail] = useState(false); // bật modal

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/order", {
        params: {
          page: currentPage,
          start_date: startDate || undefined,
          end_date: endDate || undefined,
          page_size: 6,
        },
      });

      setOrders(res.data.data || []);
      setLastPage(res.data.last_page || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, startDate, endDate]);

  const fetchOrderDetail = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/admin/order-by-id/${id}`
      );
      setSelectedOrder(res.data[0]); // vì API trả về mảng
      setShowDetail(true);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="orders-container">
      <h2>Quản lý Đơn hàng</h2>

      {/* Filter */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={() => {
            setCurrentPage(1);
            fetchOrders();
          }}
        >
          Tìm kiếm
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : orders.length === 0 ? (
        <p>Chưa có đơn hàng</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Bàn</th>
              <th>Tổng tiền</th>
              <th>Thành tiền cuối cùng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.cus_name}</td>
                <td>{o.table?.table_number}</td>
                <td>{Number(o.total_amount).toLocaleString('vi-VN')} đ</td>
                <td>{Number(o.final_amount).toLocaleString('vi-VN')} đ</td>
                <td>{o.status}</td>
                <td>
                  <button
                    className="btn-confirm__oder"
                    onClick={() => fetchOrderDetail(o.id)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteOrder(o.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Trang {currentPage} / {lastPage}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
      </div>

      {showDetail && selectedOrder && (
  <div className="order-modal">
    <div className="order-modal__content">
      <div className="order-modal__header">
        <h3>Chi tiết đơn #{selectedOrder.id}</h3>
        <button
          className="order-modal__close"
          onClick={() => setShowDetail(false)}
        >
          ✕
        </button>
      </div>

      <div className="order-modal__body">
        <p><b>Khách hàng:</b> {selectedOrder.customer?.name}</p>
        <p><b>Bàn:</b> {selectedOrder.table?.table_number}</p>
        <p><b>Nhân viên:</b> {selectedOrder.user?.name}</p>
        <p><b>Tổng tiền:</b> {Number(selectedOrder.total_amount).toLocaleString('vi-VN')} đ</p>
        <p><b>Trạng thái:</b> {selectedOrder.status}</p>

        <h4>Món ăn</h4>
        <ul>
          {selectedOrder.details.map((d, i) => (
            <li key={i}>
              <span>{d.dish?.name} (SL: {d.quantity})</span>
              <span>{Number(d.price).toLocaleString('vi-VN')} đ</span>
            </li>
          ))}
        </ul>

        <h4>Thanh toán</h4>
        <ul>
          {selectedOrder.payments.map((p, i) => (
            <li key={i}>
              <span>{p.method}</span>
              <span>{Number(p.amount).toLocaleString('vi-VN')} đ</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-modal__footer">
        <button onClick={() => setShowDetail(false)}>Đóng</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
