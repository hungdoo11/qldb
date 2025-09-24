import React, { useState, useEffect, useRef } from "react";
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

function Header({ cart = [], addToCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
const tableNumber = localStorage.getItem("tableNumber") || 1; // mặc định 1

  // Lấy user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Gọi API lấy categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(res.data); // giả sử API trả về array [{id, name, slug}]
      } catch (err) {
        console.error("Fetch categories error:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };


  const toggleMenu = () => setOpenMenu(!openMenu);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false); // click ngoài menu -> tắt menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleCart = () => {
    if (cart.length > 0) {
      navigate("/order", { state: { cart } }); // Chuyển đến trang đặt món với dữ liệu giỏ hàng
    }
  };

  

  const handleOrder = async () => {
    if (cart.length === 0) return alert("Chưa có món nào!");
    console.log("Cart data:", cart);

    try {
     const response = await axios.post("http://127.0.0.1:8000/api/orders", {
  table_id: tableNumber,
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

        <div className="menu-toggle" onClick={() => setOpenMenu(!openMenu)}>
          <FaBars />
        </div>

        {/* Menu */}
        <nav className={`menu ${openMenu ? "show" : ""}`}>
          <Link to="/">Trang chủ</Link>
          <Link to="/about">Giới thiệu FOOD</Link>

          {/* Dropdown menu categories từ API */}
          <div className="dropdown" ref={menuRef}>
            <Link to="/product/1" className="menu-link" onClick={toggleMenu}>
              Thực đơn
            </Link>
            <div
              className={`dropdown-menu ${
                openMenu || location.pathname.startsWith("/product") ? "show" : ""
              }`}
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/product/${cat.id}`}
                    className={location.pathname === `/product/${cat.id}` ? "active" : ""}
                  >
                    {cat.name}
                  </Link>
                ))
              ) : (
                <p>Đang tải...</p>
              )}
            </div>
          </div>

          <Link to="/discount">Khuyến mãi</Link>
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
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}

            <div className={`dropdown-content cart-dropdown ${openCart ? "show" : ""}`}>
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