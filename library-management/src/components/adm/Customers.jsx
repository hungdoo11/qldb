import React, { useEffect, useState } from "react";
import api from "../api/Api"; // ✅ import từ file api.js
import "./admin.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customer");
      setCustomers(res);
    } catch (err) {
      console.error("Lỗi khi load users:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (customer) => {
    setEditingCustomer(customer.id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone ?? "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa khách hàng này?")) return;
    try {
      await api.delete(`/customer/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  const handleSave = async () => {
    try {
      await api.put(`/customer/${editingCustomer}`, formData);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
    }
  };




  return (
    <div>
      <h2>Quản lý Khách hàng</h2>

      {/* Bảng danh sách */}
      <table className="admin-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>ĐIỂM</th>
            <th>LOẠI</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone ?? "Chưa có"}</td>
              <td>{c.points}</td>
              <td>{c.type}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(c)}>Sửa</button>{" "}
                <button className="btn-delete" onClick={() => handleDelete(c.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup sửa */}
      {editingCustomer && (
        <div className="popup">
          <div className="popup-box">
            <h3>Sửa khách hàng</h3>
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
            <div className="popup-actions">
              <button onClick={handleSave}>Lưu</button>
              <button onClick={() => setEditingCustomer(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
