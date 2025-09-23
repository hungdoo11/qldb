import React, { useState, useEffect } from "react";
import "./Header.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaShoppingCart,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/Api";

function Header({ cart = [], addToCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState(null);

  // Popup lịch sử
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Lấy user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 👉 Xem lịch sử
  const handleViewHistory = async (customer) => {
    try {
      const res = await api.get(`/users/${customer.id}/orders`);
      setOrderHistory(res.data || []); // luôn đảm bảo là array
      setSelectedCustomer(customer);
    } catch (err) {
      console.error("Lỗi khi load lịch sử:", err);
      setOrderHistory([]);
      setSelectedCustomer(customer);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const toggleMenu = () => setOpenMenu(!openMenu);
  const toggleCart = () => {
    if (cart.length > 0) {
      navigate("/order", { state: { cart } }); // Chuyển đến trang đặt món với dữ liệu giỏ hàng
    }
  };

  // 👉 Đặt món
  const handleOrder = async () => {
    if (cart.length === 0) return alert("Chưa có món nào!");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/orders", {
        table_id: 1,
        customer_name: user?.name || "Khách lẻ",
        phone: user?.phone || "0000000000",
        items: cart.map((item) => ({
          dish_id: item.id,
          price: item.price || 0,
          quantity: item.quantity,
        })),
      });

      console.log("Order response:", response.data);
      alert("Đặt món thành công!");
      window.location.reload();
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert(
        "Có lỗi khi đặt món! Chi tiết: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <header>
      {/* --- Top Bar --- */}
      <div className="top-bar">
        <div className="top-left">
          <span className="slogan">Enjoy delicious food</span>
          <span className="contact">
            <FaPhoneAlt /> +84964834431
          </span>
          <span className="contact">
            <FaEnvelope /> restaurantfood@gmail.com
          </span>
        </div>
        <div className="top-right">
          <a href="/">Liên hệ</a>
          <a href="/">FAQ</a>
        </div>
      </div>

      {/* --- Navbar --- */}
      <div className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Libri Logo" />
          <span>FOOD</span>
        </div>

        <div className="menu-toggle" onClick={() => setOpenMenu(!openMenu)}>
          <FaBars />
        </div>

        {/* Menu */}
        <nav className={`menu ${openMenu ? "show" : ""}`}>
          <Link to="/">Trang chủ</Link>
          <Link to="/about">Giới thiệu FOOD</Link>
          <div className="dropdown">
            <Link to="/thucdon" className="menu-link" onClick={toggleMenu}>
              Thực đơn
            </Link>
            <div
              className={`dropdown-menu ${
                openMenu ||
                ["/thucdon", "/bo", "/heo", "/com", "/nuoc"].includes(
                  location.pathname
                )
                  ? "show"
                  : ""
              }`}
            >
              <Link
                to="/thucdon"
                className={location.pathname === "/thucdon" ? "active" : ""}
              >
                Món ngon phải thử
              </Link>
              <Link
                to="/bo"
                className={location.pathname === "/bo" ? "active" : ""}
              >
                Bò Mỹ
              </Link>
              <Link
                to="/heo"
                className={location.pathname === "/heo" ? "active" : ""}
              >
                Heo Quay
              </Link>
              <Link
                to="/com"
                className={location.pathname === "/com" ? "active" : ""}
              >
                Cơm
              </Link>
              <Link
                to="/nuoc"
                className={location.pathname === "/nuoc" ? "active" : ""}
              >
                Thức uống
              </Link>
            </div>
          </div>
          <Link to="/service">Dịch vụ</Link>
        </nav>

        {/* Actions */}
        <div className="actions">
          {/* Giỏ hàng */}
          <div
            className="dropdown-icon cart-container"
            onClick={toggleCart}
            onMouseEnter={() => setOpenCart(true)}
            onMouseLeave={() => setOpenCart(false)}
          >
            <FaShoppingCart className="icon" />
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}

            <div
              className={`dropdown-content cart-dropdown ${
                openCart ? "show" : ""
              }`}
            >
              {cart.length === 0 ? (
                <p>Chưa có món nào</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    {item.name} x {item.quantity} ={" "}
                    {(parseFloat(item.price) * item.quantity).toFixed(0)}đ
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Search */}
          <FaSearch className="icon" />

          {/* Tài khoản */}
          <div className="dropdown">
            {!user ? (
              <>
                <button className="btn-account">Tài khoản</button>
                <div className="dropdown-content">
                  <a href="/login">Đăng nhập</a>
                  <a href="/register">Đăng ký</a>
                </div>
              </>
            ) : (
              <>
                <button className="btn-account">Chào, {user.name}</button>
                <div className="dropdown-content">
                  <a href="#" onClick={handleLogout}>
                    Đăng xuất
                  </a>
                  <button
                    className="btn-history"
                    onClick={() => handleViewHistory(user)}
                  >
                    Xem lịch sử
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Popup lịch sử */}
      {selectedCustomer && (
        <div className="popup history-popup">
          <div className="popup-box history-box">
            <h3>Lịch sử đặt món - {selectedCustomer.name}</h3>
            {orderHistory.length === 0 ? (
              <p>Chưa có đơn hàng nào</p>
            ) : (
              <table className="history-table" border="1" cellPadding="8">
                <thead>
                  <tr>
                    <th>ID Đơn</th>
                    <th>Ngày</th>
                    <th>Tổng tiền</th>
                    <th>Món ăn</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{new Date(order.created_at).toLocaleString()}</td>
                      <td>{order.total_price}đ</td>
                      <td>
                        {order.items?.map((i) => (
                          <div key={i.id}>
                            {i.dish?.name} x {i.quantity} ={" "}
                            {i.price * i.quantity}đ
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="popup-actions">
              <button onClick={() => setSelectedCustomer(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;