import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">🍴 Đăng ký thành viên</h2>
        <p className="register-subtitle">Đặt món nhanh hơn khi có tài khoản</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Họ và tên"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Đăng ký
          </button>
        </form>

        <p className="register-footer">
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
