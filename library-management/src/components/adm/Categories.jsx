import React, { useState, useEffect } from "react";
import api from "../api/Api";
import CategoryForm from "../addform/CategoryForm";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null); // id đang sửa
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res || []);
    } catch (err) {
      console.error("Lỗi lấy categories:", err);
    }
  };

  // thêm mới
  const handleAdd = async (name) => {
    try {
      await api.post("/categories", { name });
      fetchCategories();
    } catch (err) {
      console.error("Lỗi thêm category:", err);
    }
  };

  // sửa
  const handleEdit = async (id) => {
    try {
      await api.put(`/categories/${id}`, { name: editValue });
      setEditing(null);
      setEditValue("");
      fetchCategories();
    } catch (err) {
      console.error("Lỗi sửa category:", err);
    }
  };

  // xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Lỗi xóa category:", err);
    }
  };

  return (
    <div className="categories">
      <h2>Quản lý Danh mục</h2>

      {/* form thêm */}
      <CategoryForm onAdd={handleAdd} />

      {/* danh sách */}
      <ul className="cate-list">
        {categories.length > 0 ? (
          categories.map((c) => (
            <li key={c.id} className="cate-item">
              {editing === c.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button className="btn-submit" onClick={() => handleEdit(c.id)}>Lưu</button>
                  <button className="btn-cancel" onClick={() => setEditing(null)}>Hủy</button>
                </>
              ) : (
                <>
                  <span>{c.name}</span>
                  <div className="actions">
                    <button
                      onClick={() => {
                        setEditing(c.id);
                        setEditValue(c.name);
                      }}
                    >
                      Sửa
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(c.id)}>Xóa</button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p>Chưa có danh mục nào</p>
        )}
      </ul>
    </div>
  );
}
