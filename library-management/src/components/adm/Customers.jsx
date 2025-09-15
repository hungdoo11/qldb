import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css"; // để css cho popup

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load danh sách users
  const fetchCustomers = () => {
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi load users:", err);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Khi bấm nút "Sửa" → hiện box
  const handleEdit = (customer) => {
    setEditingCustomer(customer.id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone ?? "",
    });
  };

  // Khi bấm nút "Xóa"
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa khách hàng này?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  // Lưu khi sửa
  const handleSave = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/users/${editingCustomer}`,
        formData
      );
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
              <td>
                <button onClick={() => handleEdit(c)}>Sửa</button>{" "}
                <button onClick={() => handleDelete(c.id)}>Xóa</button>
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
