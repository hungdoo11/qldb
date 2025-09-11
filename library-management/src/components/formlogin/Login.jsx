import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    alert(res.data.message);

    localStorage.setItem("user", JSON.stringify(res.data.user));

    if (res.data.user.level === 1) {
      navigate("/admin"); // 👉 Admin
    } else {
      navigate("/"); // 👉 User
    }
  } catch (err) {
    alert(err.response?.data?.message || "Đăng nhập thất bại");
  }
};


  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" name="email"
          value={formData.email} onChange={handleChange} required /><br />
        <input type="password" placeholder="Mật khẩu" name="password"
          value={formData.password} onChange={handleChange} required /><br />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
    </div>
  );
}

export default Login;
