import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../adm/admin.css'; // CSS nằm trong adm/
// import AdminSearch from "../adm/AdminSearch"; 

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-logo">
          <h1>
            <Link to="/admin" className="admin-home-link">
              Admin Dashboard
            </Link>
          </h1>
        </div>

        {/* Ô tìm kiếm */}
        {/* <AdminSearch /> */}
      </header>

      <div className="admin-body">
        {/* Sidebar */}

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
