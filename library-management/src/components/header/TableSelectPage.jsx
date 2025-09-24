import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TableSelectPage.css";

export default function TableSelectPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const navigate = useNavigate();

  // Lấy danh sách bàn
  const fetchTables = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/tables", {
        headers: { Accept: "application/json" },
      });
      setTables(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch tables error:", err);
      setError("Không thể tải danh sách bàn");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // Xác nhận chọn bàn
  const handleConfirm = useCallback(() => {
    if (!selectedTable) {
      return alert("Vui lòng chọn bàn trước khi xác nhận");
    }
    localStorage.setItem("tableNumber", selectedTable.table_number);
    localStorage.setItem("tableId", selectedTable.id);
    navigate("/"); // 👉 chuyển sang trang chủ
  }, [selectedTable, navigate]);

  const translateStatus = (status) => {
    switch (status) {
      case "available": return { text: "Trống", color: "green" };
      case "occupied": return { text: "Đang sử dụng", color: "red" };
      case "reserved": return { text: "Đặt trước", color: "orange" };
      default: return { text: "Không xác định", color: "gray" };
    }
  };

  if (loading) {
    return (
      <div className="ts-loading">
        <div className="spinner"></div>
        <p>Đang tải danh sách bàn...</p>
      </div>
    );
  }

  if (error) return <p className="ts-error">{error}</p>;

  return (
    <div className="ts-container">
      <h2 className="ts-title">Chọn bàn hiện tại</h2>
      <div className="ts-grid">
        {tables.map((table) => {
          const status = translateStatus(table.status);
          return (
            <div
              key={table.id}
              className={`ts-card 
                ${selectedTable?.id === table.id ? "ts-selected" : ""} 
                ${table.status !== "available" ? "ts-disabled" : ""}`}
              onClick={() => table.status === "available" && setSelectedTable(table)}
            >
              <h3 className="ts-card-number">Bàn {table.table_number}</h3>
              <span className={`ts-status ts-${status.color}`}>
                {status.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Nút xác nhận */}
      <button
        className="ts-btn-confirm"
        onClick={handleConfirm}
        disabled={!selectedTable}
      >
        Xác nhận bàn
      </button>
    </div>
  );
}
