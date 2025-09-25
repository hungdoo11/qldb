import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line
} from "recharts";
import "./admin.css";

function AdminDashboard() {
  const [orderData, setOrderData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, revenueRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/admin/statistical-order-by-day"),
          axios.get("http://127.0.0.1:8000/api/admin/statistical-revenue-by-day")
        ]);

        // Map dữ liệu API thành dạng Recharts
        const orders = ordersRes.data.map(item => ({
          day: item.day_name,
          orders: item.value
        }));

        const revenue = revenueRes.data.map(item => ({
          day: item.day_name,
          revenue: parseFloat(item.value)
        }));

        setOrderData(orders);
        setRevenueData(revenue);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi fetch dữ liệu thống kê:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Đang tải dữ liệu thống kê...</p>;

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Trang Quản Trị Admin</h2>

      <div className="charts-section">
        {/* Biểu đồ Doanh thu theo ngày */}
        <div className="chart-box">
          <h3>Doanh thu theo ngày</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value) + " đ"} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Đơn hàng theo ngày */}
        <div className="chart-box">
          <h3>Đơn hàng theo ngày</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
