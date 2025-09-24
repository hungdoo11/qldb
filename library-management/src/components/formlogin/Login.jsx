import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login({setUser}) {
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
    console.log("Data sent to API:", formData);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", formData, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      console.log("Full login response:", res.data);
      if (res.data.role === "admin") {
        if (res.data.user && Object.keys(res.data.user).length > 0) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("role", "admin");
          navigate("/admin");
        } else {
          alert("Dữ liệu admin không hợp lệ!");
        }
      } else if (res.data.role === "customer") {
        if (res.data.customer && Object.keys(res.data.customer).length > 0) {
          localStorage.setItem("user", JSON.stringify(res.data.customer));
          localStorage.setItem("role", "customer");

          localStorage.setItem("customer_id", JSON.stringify(res.data.customer.id));
            setUser(res.data.customer);
          navigate("/select-table");
        } else {
          alert("Dữ liệu khách hàng không hợp lệ!");
        }
      } else {
        alert("Sai tài khoản hoặc mật khẩu ❌");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
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
