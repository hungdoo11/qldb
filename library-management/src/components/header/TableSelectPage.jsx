import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TableSelectPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const navigate = useNavigate();

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

const handleSelect = useCallback(() => {
  if (!selectedTable) return alert("Vui lòng chọn bàn");
  localStorage.setItem("tableNumber", selectedTable.table_number);
  localStorage.setItem("tableId", selectedTable.id);
}, [selectedTable]);

  useEffect(() => {
  console.log("tableId updated:", localStorage.getItem("tableId"));
  if (selectedTable) {
    handleSelect();
    navigate("/");
  }
}, [selectedTable, navigate]);

  const translateStatus = (status) => {
    switch (status) {
      case "available": return "Trống";
      case "occupied": return "Đang sử dụng";
      case "reserved": return "Đặt trước";
      default: return "Không xác định";
    }
  };

  if (loading) return <p>Đang tải danh sách bàn...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="ts-container">
      <h2 className="ts-title">Chọn bàn hiện tại</h2>
      <div className="ts-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`ts-card ${selectedTable?.id === table.id ? "ts-selected" : ""} ${
              table.status !== "available" ? "ts-disabled" : ""
            }`}
            onClick={() => table.status === "available" && setSelectedTable(table)}
          >
            <h3 className="ts-card-number">Bàn {table.table_number}</h3>
            <p className="ts-card-status">{translateStatus(table.status)}</p>
          </div>
        ))}
      </div>
      <button
        className="ts-btn-confirm"
        onClick={handleSelect}
        disabled={!selectedTable}
      >
        Xác nhận bàn
      </button>
    </div>
  );
}