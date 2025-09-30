import React, { useEffect, useState } from "react";
import api from "../api/Api";
import "./admin.css";

export default function ManagerUser() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    name: "",
    email: "",
    phone: "",
    role: "staff",   // ✅ sửa mặc định thành staff (hoặc "")
    password: "",
  });

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/users");
      setCustomers(res);
    } catch (err) {
      console.error("Lỗi khi load users:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const resetForm = () => {
    setFormData({
      user_name: "",
      name: "",
      email: "",
      phone: "",
      role: "staff",   // ✅ đồng bộ luôn
      password: "",
    });
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer.id);
    setFormData({
      user_name: customer.user_name ?? "",
      name: customer.name,
      email: customer.email,
      phone: customer.phone ?? "",
      role: customer.role ?? "staff",  // ✅ lấy role của user để select sẵn
      password: "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa nhân viên này?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        if (!formData.password) {
          alert("Vui lòng nhập mật khẩu khi thêm mới!");
          return;
        }
        await api.post(`/users`, formData);
        setIsAdding(false);
      } else {
        const dataToUpdate = { ...formData };
        if (!dataToUpdate.password) delete dataToUpdate.password;

        const res =await api.put(`/users/${editingCustomer}`, dataToUpdate);
        console.log(res)
        setEditingCustomer(null);
      }

      resetForm();
      fetchCustomers();
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
    }
  };

  return (
    <div>
      <h2>Quản lý nhân viên</h2>

      {/* Nút thêm nhân viên */}
      <button
        className="btn-add"
        onClick={() => {
          resetForm();
          setIsAdding(true);
        }}
      >
        + Thêm nhân viên
      </button>

      {/* Bảng danh sách */}
      <table className="admin-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.user_name}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone ?? "Chưa có"}</td>
              <td>{c.role}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(c)}>
                  Sửa
                </button>{" "}
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(c.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup thêm/sửa */}
      {(editingCustomer || isAdding) && (
        <div className="popup">
          <div className="popup-box">
            <h3>{isAdding ? "Thêm nhân viên" : "Sửa nhân viên"}</h3>

            <input
              type="text"
              placeholder="User Name"
              value={formData.user_name}
              onChange={(e) =>
                setFormData({ ...formData, user_name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Tên"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            {/* Trường password */}
            <input
              type="password"
              placeholder={
                isAdding
                  ? "Mật khẩu (bắt buộc)"
                  : "Mật khẩu (chỉ nhập khi muốn đổi)"
              }
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Select role */}
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="styled-select"
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="chef">Chef</option>
            </select>

            <div className="popup-actions">
              <button onClick={handleSave}>Lưu</button>
              <button
                onClick={() => {
                  setEditingCustomer(null);
                  setIsAdding(false);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
