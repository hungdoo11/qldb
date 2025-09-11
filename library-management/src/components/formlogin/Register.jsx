import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
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
    <div>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tên đăng nhập" name="name"
          value={formData.name} onChange={handleChange} required /><br />
        <input type="email" placeholder="Email" name="email"
          value={formData.email} onChange={handleChange} required /><br />
        <input type="password" placeholder="Mật khẩu" name="password"
          value={formData.password} onChange={handleChange} required /><br />
        <button type="submit">Đăng ký</button>
      </form>
      <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    </div>
  );
}

export default Register;
