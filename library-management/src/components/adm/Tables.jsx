import React from "react";
import "./admin.css";

export default function Tables() {
  const tables = [
    { id: 1, name: "Bàn 1", status: "Trống" },
    { id: 2, name: "Bàn 2", status: "Đang sử dụng" },
    { id: 3, name: "Bàn 3", status: "Đặt trước" },
    { id: 4, name: "Bàn 4", status: "Trống" },
    { id: 5, name: "Bàn 5", status: "Đang sử dụng" },
    { id: 6, name: "Bàn 6", status: "Trống" },
  ];

  const getStatusClass = (status) => {
    if (status === "Trống") return "status-empty";
    if (status === "Đang sử dụng") return "status-busy";
    if (status === "Đặt trước") return "status-reserved";
    return "";
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Danh sách bàn</h2>

      <div className="tables-grid">
        {tables.map((table) => (
          <div className="table-card" key={table.id}>
            <h3>{table.name}</h3>
            <p className={`table-status ${getStatusClass(table.status)}`}>
              {table.status}
            </p>
            <div className="table-actions">
              {table.status === "Trống" && <button className="btn-confirm">Đặt bàn</button>}
              {table.status === "Đang sử dụng" && <button className="btn-confirm">Thanh toán</button>}
              <button className="btn-back">Chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
