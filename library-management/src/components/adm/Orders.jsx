import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import api from "../api/Api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/admin/order");
    console.log(res)
    setOrders(res);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://127.0.0.1:8000/api/orders/${id}`, { status });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/orders/${id}`);
    fetchOrders();
  };

  return (
    <div className="orders-container">
      <h2>Quản lý Đơn hàng</h2>
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
          <button onClick={() => updateStatus(o.id, "Đang sử dụng")}>
            Xác nhận
          </button>
          <button onClick={() => deleteOrder(o.id)}>Hủy</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
