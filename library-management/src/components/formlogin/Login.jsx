import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; 

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", formData);

      console.log("Full login response:", res.data);

      // ✅ Lưu thông tin user vào localStorage
      if (res.data.role === "admin") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("role", "admin");
        navigate("/admin"); // điều hướng admin
      } else if (res.data.role === "customer") {
        localStorage.setItem("user", JSON.stringify(res.data.customer));
        localStorage.setItem("role", "customer");
        navigate("/"); // điều hướng user thường
      } else {
        alert("Sai tài khoản hoặc mật khẩu ❌");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Đăng nhập thất bại ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Đăng nhập</h2>
        <p className="login-subtitle">Truy cập tài khoản để đặt món nhanh hơn</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Email or User_name"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">Đăng nhập</button>
        </form>

        <p className="login-footer">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
