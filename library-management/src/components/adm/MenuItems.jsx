import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api";
import "./admin.css";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemExtras, setMenuItemExtras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      console.log("Categories Response:", res);
      setCategories(res || []);
    } catch (err) {
      console.error("Fetch categories error:", err.response?.data || err.message);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const res = await api.get("/dishes", {
        params: {
          page: currentPage,
          per_page: 4,
        },
      });
      console.log("Dishes Response:", res.data);
      const data = res.data.data || res.data || [];
      const formatted = Array.isArray(data)
        ? data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          category: item.category_name || "",
          category_id: item.category_id ,
          status: item.status || "Available",
          preview: item.image_path,
        }))
        : [];
      setMenuItems(formatted);
      setMenuItemExtras(formatted);
      setLastPage(res.last_page || 1);
      console.log("Current Page:", currentPage, "Last Page from API:", res.data.last_page);
    } catch (err) {
      console.error("Fetch menu items error:", err.response?.data || err.message);
      setMenuItems([]);
      setMenuItemExtras([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa món này?")) return;
    try {
      await api.delete(`/admin/dishes/${id}`);
      fetchMenuItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  const setItemBYcategory = (id) =>{
    setMenuItemExtras(menuItems.filter((item) => item.category_id == id))
  }
  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Danh Sách Món Ăn</h2>
        <div className="filters">
          <div className="filter-category">
            <label>Phân loại: </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setItemBYcategory(e.target.value);
              }}
            >
              <option value="">Tất cả</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
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
          {menuItemExtras.length > 0 ? (
            menuItemExtras.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.preview && (
                    <img src={item.preview} alt={item.name} className="menu-img-i" />
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()} đ</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>
                  <span
                    className={`status ${item.status === "Available" ? "status-available" : "status-unavailable"
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

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          ⬅️ Trước
        </button>

        <span className="page-info">
          Trang <strong>{currentPage}</strong> / {lastPage}
        </span>

        <button
          className="page-btn"
          onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
          disabled={currentPage === lastPage}
        >
          Tiếp ➡️
        </button>
      </div>

    </div>
  );
}

export default MenuItems;