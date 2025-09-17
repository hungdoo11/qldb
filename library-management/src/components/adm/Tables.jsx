import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const translateStatus = (status) => {
    switch (status) {
      case "available":
        return "Trống";
      case "occupied":
        return "Đang sử dụng";
      case "reserved":
        return "Đặt trước";
      default:
        return "Không xác định";
    }
  };

  const getStatusClass = (status) => {
    if (status === "available") return "status-empty";
    if (status === "occupied") return "status-busy";
    if (status === "reserved") return "status-reserved";
    return "";
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/admin/tables", {
          headers: {
            Accept: "application/json",
          },
        });
        setTables(res.data); 
        setLoading(false);
      } catch (err) {
        console.error("Fetch tables error:", err);
        setError("Không thể tải danh sách bàn");
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  if (loading) return <p>Đang tải danh sách bàn...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Danh sách bàn</h2>

      <div className="tables-grid">
        {tables.length > 0 ? (
          tables.map((table) => (
            <div className="table-card" key={table.id}>
              <h3>Bàn {table.table_number}</h3>
              <p
                className={`table-status ${getStatusClass(table.status)}`}
              >
                {translateStatus(table.status)}
              </p>
              <div className="table-actions">
                {table.status === "available" && (
                  <button className="btn-confirm">Đặt bàn</button>
                )}
                {table.status === "occupied" && (
                  <button className="btn-confirm">Thanh toán</button>
                )}
                <button className="btn-back">Chi tiết</button>
              </div>
            </div>
          ))
        ) : (
          <p>Không có bàn nào</p>
        )}
      </div>
    </div>
  );
}
