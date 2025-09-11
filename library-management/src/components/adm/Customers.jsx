import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users")
      .then(res => {
        setCustomers(res.data);
      })
      .catch(err => {
        console.error("Lỗi khi load users:", err);
      });
  }, []);

  return (
    <div>
      <h2>Quản lý Khách hàng</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone ?? "Chưa có"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
