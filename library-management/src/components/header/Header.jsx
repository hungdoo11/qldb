import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaPhoneAlt, FaEnvelope, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
 import axios from "axios";

function Header({ cart = [], addToCart }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState(null);

  // Lấy user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleCart = () => {
    setOpenCart(!openCart);
  };



const handleOrder = async () => {
  if (cart.length === 0) return alert("Chưa có món nào!");
  console.log("Cart data:", cart); // Kiểm tra dữ liệu

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/orders", {
      table_id: 1,
      customer_name: user?.name || "Khách lẻ",
      phone: user?.phone || "0000000000",
      items: cart.map((item) => ({
        dish_id: item.id,
        price: item.price || 0, // Giữ price để debug
        quantity: item.quantity,
      })),
    });

    console.log("Order response:", response.data);
    alert("Đặt món thành công!");
    window.location.reload();
  } catch (err) {
    console.error("Order error:", err.response?.data || err.message);
    alert("Có lỗi khi đặt món! Chi tiết: " + (err.response?.data?.message || err.message));
  }
};



  return (
    <header>
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

      <div className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Libri Logo" />
          <span>FOOD</span>
        </div>

        {/* Menu */}
        <nav className="menu">
          <Link to="/">Trang chủ</Link>
          <Link to="/about">Giới thiệu FOOD</Link>
          <div className="dropdown">
            <Link to="/thucdon" className="menu-link" onClick={toggleMenu}>
              Thực đơn
            </Link>
            <div
              className={`dropdown-menu ${
                openMenu || ["/thucdon", "/bo", "/heo", "/com", "/nuoc"].includes(location.pathname)
                  ? "show"
                  : ""
              }`}
            >
              <Link to="/thucdon" className={location.pathname === "/thucdon" ? "active" : ""}>
                Món ngon phải thử
              </Link>
              <Link to="/bo" className={location.pathname === "/bo" ? "active" : ""}>
                Bò Mỹ
              </Link>
              <Link to="/heo" className={location.pathname === "/heo" ? "active" : ""}>
                Heo Quay
              </Link>
              <Link to="/com" className={location.pathname === "/com" ? "active" : ""}>
                Cơm
              </Link>
              <Link to="/nuoc" className={location.pathname === "/nuoc" ? "active" : ""}>
                Thức uống
              </Link>
            </div>
          </div>
          <Link to="/discount">Khuyến mãi</Link>
          <Link to="/service">Dịch vụ</Link>
        </nav>

        {/* Actions */}
        <div className="actions">
          {/* Giỏ hàng */}
         <div className="dropdown-icon cart-container" onClick={toggleCart}>
  <FaShoppingCart className="icon" />
  {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}

  <div className={`dropdown-content cart-dropdown ${openCart ? "show" : ""}`}>
    {cart.length === 0 ? (
      <p>Chưa có món nào</p>
    ) : (
      <>
        {cart.map((item, idx) => (
          <div key={idx} className="cart-item">
            {item.name} x {item.quantity} ={" "}
            {(parseFloat(item.price) * item.quantity).toFixed(0)}đ
          </div>
        ))}

        
        <div className="cart-total">
          Tổng:{" "}
          {cart
            .reduce(
              (total, item) => total + parseFloat(item.price) * item.quantity,
              0
            )
            .toFixed(0)}đ
        </div>

        <button onClick={handleOrder} className="order-btn">
          Đặt món
        </button>
      </>
    )}
  </div>
</div>

         
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
