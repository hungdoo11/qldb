import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";

function AdminDashboard() {
  const cards = [
    { title: "Quản lý Đơn hàng", link: "/admin/orders" },
    { title: "Chi tiết Đơn hàng", link: "/admin/orderdetail" },
    { title: "Thanh toán", link: "/admin/payment" },
    { title: "Doanh thu", link: "/admin/revenue" },
    { title: "Quản lý Danh mục", link: "/admin/categories" },
    { title: "Quản lý Món ăn", link: "/admin/menuitems" },
    { title: "Quản lý Khách hàng", link: "/admin/customers" },
    { title: "Quản lý Bàn", link: "/admin/tables" },
  ];

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Trang Quản Trị Admin</h2>
      <div className="card-grid">
        {cards.map((item, index) => (
          <Link to={item.link} key={index} className="dashboard-card">
            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
