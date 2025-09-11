  import React, { useState,useEffect } from "react";
  import "./Header.css";
  import { FaPhoneAlt, FaEnvelope, FaShoppingCart, FaSearch } from "react-icons/fa";
  import { Link,useLocation } from "react-router-dom";


  function Header() {

    const location = useLocation(); // lấy URL hiện tại
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);

    useEffect(() => {
      // Lấy user từ localStorage nếu có
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/"; // reload về Home
    }
    // Toggle bằng click
    const toggleDropdown = () => {
      setOpen(!open);
    };

    // Nếu click ra ngoài menu thì tự đóng
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".dropdown")) {
          setOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);


    return (
      <header>
        {/* Top bar */}
        <div className="top-bar">
          <div className="top-left">
            <span className="slogan">Read more, read better</span>
            <span className="contact">
              <FaPhoneAlt /> +84964834431
            </span>
            <span className="contact">
              <FaEnvelope /> librireading.info@gmail.com
            </span>
          </div>
          <div className="top-right">
            <a href="/">Thuê, đổi, trả sách</a>
            <a href="/">Liên hệ</a>
            <a href="/">FAQ</a>
          </div>
        </div>

        {/* Navbar */}
        <div className="navbar">
          <div className="logo">
            <img src="/images/logo.png" alt="Libri Logo" />
            <span>LiBRi</span>
          </div>
          <nav className="menu">
            <Link to="/">Trang chủ</Link>
            <Link to="/about">Giới thiệu Libri</Link>

            {/* Thực đơn có submenu */}
            <div className="dropdown">
        <Link
          to="/thucdon"
          className="menu-link"
          onClick={toggleDropdown}
        >
          Thực đơn
        </Link>

        <div className={`dropdown-menu ${
    open || ["/thucdon", "/bo", "/heo", "/com", "/nuoc"].includes(location.pathname)
    ? "show"
    : ""
  }`}>

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

            <Link to="/discount">Khuyến mãi</Link>
            <Link to="/service">Dịch vụ</Link>
          </nav>

              <div className="actions">
      <FaShoppingCart className="icon" />
      <FaSearch className="icon" />

      <div className="dropdown">
        {!user ? (
          <>
            <button className="btn-account">Tài khoản</button>
            <div className="dropdown-content">
              <a href="/Login">Đăng nhập</a>
              <a href="/Register">Đăng ký</a>
            </div>
          </>
        ) : (
          <>
            <button className="btn-account">Chào, {user.name}</button>
            <div className="dropdown-content">
              <a href="#" onClick={handleLogout}>Đăng xuất</a>
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
