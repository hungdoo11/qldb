import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../adm/admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [openTableMenu, setOpenTableMenu] = useState(false);
  const [openFoodMenu, setOpenFoodMenu] = useState(false); // toggle submenu món ăn

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/orders">Quản lý Đơn hàng</Link>
          <Link to="/admin/orderdetail">Chi tiết Đơn hàng</Link>
          <Link to="/admin/payment">Thanh toán</Link>
          <Link to="/admin/revenue">Doanh thu</Link>
          
          <Link to="/admin/categories">Quản lý Danh mục</Link>
        <Link to="/admin/categories/add" className="submenu-item">
          ➕ Thêm Danh mục
        </Link>


          {/* Quản lý Món ăn */}
          <div
            className="sidebar-parent"
            onClick={() => setOpenFoodMenu(!openFoodMenu)}
          >
              <Link to="/admin/menuitems">Quản lý Món ăn</Link>
          </div>
          {openFoodMenu && (
            <div className="sidebar-submenu">
              {/* <Link to="/admin/menuitems" className="submenu-item">
                📋 Danh sách Món ăn
              </Link> */}
              <Link to="/admin/menuitems/creat" className="submenu-item">
                ➕ Thêm Món ăn
              </Link>
            </div>
          )}

          <Link to="/admin/customers">Quản lý Khách hàng</Link>

          {/* Quản lý Bàn */}
          <div
            className="sidebar-parent"
            onClick={() => setOpenTableMenu(!openTableMenu)}
          >
            <Link to="/admin/tables">Quản lý bàn</Link>
          </div>
          {openTableMenu && (
            <div className="sidebar-submenu">
              {/* <Link to="/admin/tables" className="submenu-item">
                📋 Danh sách Bàn
              </Link> */}
              <Link to="/admin/tables/add" className="submenu-item">
                ➕ Thêm Bàn
              </Link>
            </div>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <h3>Trang Quản Trị</h3>
          <button className="logout-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </header>

        {/* Nội dung động */}
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
