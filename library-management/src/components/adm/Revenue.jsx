import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./admin.css";

export default function Revenue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin/statistical-renuve")
      .then((response) => {
        // Chuyển đổi dữ liệu từ API
        const formatted = response.data.map((item) => ({
          month: item.month,
          revenue: parseInt(item.renuve, 10), // đổi "renuve" -> "revenue"
          orders: item.orders,
        }));
        setData(formatted);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch dữ liệu:", error);
      });
  }, []);

  return (
    <div className="">

      <h2 className="admin-title">Thống kê doanh thu</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#f39c12" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    <div className="admin-container">

      {/* Biểu đồ */}

      {/* Bảng thống kê */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tháng</th>
            <th>Số đơn</th>
            <th>Doanh thu (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.orders}</td>
              <td>{item.revenue.toLocaleString()} VNĐ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
