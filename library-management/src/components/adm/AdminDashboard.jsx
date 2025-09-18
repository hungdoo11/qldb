import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line
} from "recharts";
import "./admin.css";

function AdminDashboard() {
  const [openTableMenu, setOpenTableMenu] = useState(false);

  // const cards = [
  //   { title: "Quản lý Đơn hàng", link: "/admin/orders" },
  //   { title: "Chi tiết Đơn hàng", link: "/admin/orderdetail" },
  //   { title: "Thanh toán", link: "/admin/payment" },
  //   { title: "Doanh thu", link: "/admin/revenue" },
  //   { title: "Quản lý Danh mục", link: "/admin/categories" },
  //   { title: "Quản lý Món ăn", link: "/admin/menuitems" },
  //   { title: "Quản lý Khách hàng", link: "/admin/customers" },
  // ];

  const revenueData = [
    { month: "Th1", revenue: 4000 },
    { month: "Th2", revenue: 3000 },
    { month: "Th3", revenue: 5000 },
    { month: "Th4", revenue: 4780 },
    { month: "Th5", revenue: 5890 },
    { month: "Th6", revenue: 4390 },
    { month: "Th7", revenue: 6490 },
  ];

  const orderData = [
    { day: "T2", orders: 30 },
    { day: "T3", orders: 45 },
    { day: "T4", orders: 28 },
    { day: "T5", orders: 60 },
    { day: "T6", orders: 42 },
    { day: "T7", orders: 55 },
    { day: "CN", orders: 38 },
  ];

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Trang Quản Trị Admin</h2>

   

      {/* Biểu đồ */}
      <div className="charts-section">
        <div className="chart-box">
          <h3>Doanh thu theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

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
