import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>FOOD</h2>
        {/* <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/menuitems">Quản lý Món ăn</Link></li>
          <li><Link to="/admin/categories">Quản lý Danh mục</Link></li>
          <li><Link to="/admin/orders">Quản lý Đơn hàng</Link></li>
          <li><Link to="/admin/customers">Quản lý Khách hàng</Link></li>
          <li><Link to="/admin/tables">Quản lý Bàn</Link></li>
          <li><Link to="/admin/revenue">Doanh thu</Link></li>
          <li><Link to="/admin/payment">Thanh toán</Link></li>
        </ul> */}
      </aside>

      <main className="admin-content">
        {/* Nơi load các page con */}
        <Outlet />
      </main>
    </div>
  );
}
