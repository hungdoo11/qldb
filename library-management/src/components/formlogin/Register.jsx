import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/Api"; // dùng api thay vì axios
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    birthday: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", formData); 
      alert(res.message || "Đăng ký thành công 🎉");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert(err.response?.data?.message || "Đăng ký thất bại ❌");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">🍴 Đăng ký thành viên</h2>
        <p className="register-subtitle">Đặt món nhanh hơn khi có tài khoản</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Họ và tên *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error-text">{errors.name[0]}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "input-error" : ""}
            />
            {errors.phone && <p className="error-text">{errors.phone[0]}</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email *"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email[0]}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Mật khẩu *"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error-text">{errors.password[0]}</p>}
          </div>

          <div className="form-group">
            <input
              type="date"
              placeholder="Ngày sinh"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className={errors.birthday ? "input-error" : ""}
            />
            {errors.birthday && <p className="error-text">{errors.birthday[0]}</p>}
          </div>

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
