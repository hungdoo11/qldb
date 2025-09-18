import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api";
import "./admin.css"; // Import CSS

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await api.get("/dishes");
      const formatted = res.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        category: item.category_id ? item.category_name : "",
        status: item.status || "Available",
        preview: item.image_path,
      }));
      setMenuItems(formatted);
    } catch (err) {
      console.error("Fetch menu items error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa món này?")) return;
    try {
      await api.delete(`/dishes/${id}`);
      fetchMenuItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Danh Sách Món Ăn</h2>
        {/* <button className="btn-add" onClick={() => navigate("/admin/menuitems/creat")}>
          + Thêm Món Ăn
        </button> */}
      </div>

      <table className="menu-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên món</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.preview && (
                    <img src={item.preview} alt={item.name} className="menu-img" />
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()} đ</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>
                  <span
                    className={`status ${
                      item.status === "Available" ? "status-available" : "status-unavailable"
                    }`}
                  >
                    {item.status === "Available" ? "Có sẵn" : "Hết hàng"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/admin/menuitems/edit/${item.id}`)}
                  >
                    ✏️ Sửa
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                    🗑 Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Chưa có món ăn nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MenuItems;
