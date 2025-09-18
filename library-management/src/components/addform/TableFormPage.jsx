import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./form.css";

export default function TableFormPage() {
  const { id } = useParams(); // lấy id từ URL (nếu có => sửa)
  const navigate = useNavigate();

  const [table, setTable] = useState({
    table_number: "",
    status: "available",
  });

  const [loading, setLoading] = useState(false);

  // Nếu có id -> fetch dữ liệu bàn để sửa
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/admin/tables/${id}`)
        .then((res) => {
          setTable(res.data);
        })
        .catch((err) => {
          console.error("Lỗi khi tải bàn:", err);
        });
    }
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTable({ ...table, [name]: value });
  };

  // Gửi dữ liệu
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (id) {
      // cập nhật
      await axios.put(`http://127.0.0.1:8000/api/admin/tables/${id}`, table);
      alert("Cập nhật bàn thành công!");
    } else {
      // thêm mới
      await axios.post("http://127.0.0.1:8000/api/admin/tables", table);
      alert("Thêm bàn thành công!");
    }
    navigate("/admin/tables");
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="table-form-container">
      <h2>{id ? "Sửa bàn" : "Thêm bàn"}</h2>

      <div className="table-form-group">
        <label>Số bàn</label>
        <input
          type="text"
          name="table_number"
          value={table.table_number}
          onChange={handleChange}
        />
      </div>

      <div className="table-form-group">
        <label>Trạng thái</label>
        <select
          name="status"
          value={table.status}
          onChange={handleChange}
        >
          <option value="available">Trống</option>
          <option value="occupied">Đang sử dụng</option>
          <option value="reserved">Đặt trước</option>
        </select>
      </div>

      <div className="table-form-actions">
        <button
          className="table-form-btn-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Đang lưu..." : id ? "Cập nhật" : "Thêm mới"}
        </button>
        <button
          className="table-form-btn-back"
          onClick={() => navigate("/admin/tables")}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
