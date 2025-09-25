import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api";
import "./admin.css";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(() => setIsCategoriesLoaded(true));
  }, []);

  useEffect(() => {
    if (isCategoriesLoaded) {
      fetchMenuItems();
    }
  }, [currentPage, selectedCategory, isCategoriesLoaded]);

  // Lấy danh sách phân loại
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      console.log("Categories Response:", res.data); // Debug
      setCategories(res.data || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
      setCategories([]); // Đặt rỗng nếu lỗi
    }
  };

  // Lấy danh sách món ăn
  const fetchMenuItems = async () => {
    try {
      const res = await api.get("/dishes", {
        params: {
          page: currentPage,
          category_id: selectedCategory || undefined,
          page_size: 11,
        },
      });
      console.log("API Response:", res.data);
      const dishes = Array.isArray(res.data) ? res.data : res.data.data;
      if (!dishes) {
        console.warn("No dishes found in response");
        setMenuItems([]);
        setLastPage(1);
        return;
      }
      setMenuItems(dishes);
      setLastPage(res.data.last_page || 1);
    } catch (err) {
      console.error("Fetch menu items error:", err.response?.data || err.message);
      setMenuItems([]);
      setLastPage(1);
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

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Danh Sách Món Ăn</h2>
        <div className="filter-category">
          <label>Phân loại: </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tất cả</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))
            ) : (
              <option disabled>Không có phân loại</option>
            )}
          </select>
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
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image && <img src={item.image} alt={item.name} className="menu-img" />}
                </td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()} đ</td>
                <td>{item.quantity}</td>
                <td>{item.category_name || ""}</td>
                <td>
                  <span className={`status ${item.status === "Available" ? "status-available" : "status-unavailable"}`}>
                    {item.status === "Available" ? "Có sẵn" : "Hết hàng"}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => navigate(`/admin/menuitems/edit/${item.id}`)}>✏️ Sửa</button>
                  <button className="btn-delete" onClick={() => handleDelete(item.id)}>🗑 Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>Chưa có món ăn nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</button>
        <span style={{ margin: "0 10px" }}>Trang {currentPage} / {lastPage}</span>
        <button onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))} disabled={currentPage === lastPage}>Next</button>
      </div>
    </div>
  );
}

export default MenuItems;
