import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./admin.css";

export default function Revenue() {
  const data = [
    { month: "Tháng 1", revenue: 12000000, orders: 150 },
    { month: "Tháng 2", revenue: 15000000, orders: 180 },
    { month: "Tháng 3", revenue: 17000000, orders: 200 },
    { month: "Tháng 4", revenue: 14000000, orders: 170 },
    { month: "Tháng 5", revenue: 20000000, orders: 220 },
    { month: "Tháng 6", revenue: 22000000, orders: 250 },
  ];

  return (
    <div className="admin-container">
      <h2 className="admin-title">Thống kê doanh thu</h2>

      {/* Biểu đồ */}
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
  );
}
