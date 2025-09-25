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
        // Nếu API cần auth token, thêm headers:
        // headers: { Authorization: `Bearer ${token}` }
      });

      console.log("API response:", res); // check dữ liệu
      setOrders(res.data.data || []);
      setLastPage(res.data.last_page || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // tự động fetch khi page hoặc filter thay đổi
  useEffect(() => {
    fetchOrders();
  }, [currentPage, startDate, endDate]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error(error);
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
            setCurrentPage(1); // reset trang về 1
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
                <td>{o.total_amount} đ</td>
                <td>{o.status}</td>
                <td>
                  <button
                    className="btn-confirm__oder"
                    onClick={() => updateStatus(o.id, "Đang sử dụng")}
                  >
                    Xác nhận
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteOrder(o.id)}
                  >
                    Hủy
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
    </div>
  );
}
