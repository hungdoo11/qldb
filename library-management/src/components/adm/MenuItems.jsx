import axios from "axios";
import React, { useState, useEffect } from "react";
import api from "../api/Api";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category_id: "",
    status: "Available",
    image: null,
    preview: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

// Thêm trong MenuItems.jsx
const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "image" && files.length > 0) {
    setFormData((prev) => ({
      ...prev,
      image: files[0],
      preview: URL.createObjectURL(files[0]),
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

const handleEdit = (item) => {
  setEditingId(item.id);
  setFormData({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    category_id: item.category_id,
    status: item.status,
    image: null, // vì ảnh cũ nằm trong preview
    preview: item.preview,
  });
  setShowForm(true);
};


  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  const fetchMenuItems = async () => {
    try {

      const res = await api.get("/dishes");
      const formatted = res.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        category: item.category_id ? item.category_name : "",
        category_id: item.category_id,
        status: item.status || "Available",
        preview: item.image_path
      }));
      setMenuItems(formatted);
    } catch (err) {
      console.error("Fetch menu items error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("price", formData.price);
    fd.append("quantity", formData.quantity);
    fd.append("category_id", formData.category_id);
    fd.append("status", formData.status);
    if (formData.image) fd.append("image", formData.image);

    try {
      if (editingId) {
        fd.append("_method", "PUT");
        await api.post(`/dishes/${editingId}`, fd); // Laravel hiểu PUT
      } else {
        await api.post("/dishes", fd);
      }
      await fetchMenuItems();
      setShowForm(false);
    } catch (err) {
      console.error("Lỗi khi lưu món ăn:", err);
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
    <div style={{ padding: "20px" }}>
      <h2>Danh Sách Món Ăn</h2>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            name: "",
            price: "",
            quantity: "",
            category_id: "",
            status: "Available",
            image: null,
            preview: "",
          });
        }}
        style={{ marginBottom: "10px" }}
      >
        {showForm ? "Đóng Form" : "Thêm Món Ăn"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <h3>{editingId ? "Sửa Món Ăn" : "Thêm Món Ăn"}</h3>

          <input
            type="text"
            name="name"
            placeholder="Tên món ăn"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />

          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <br />

          <input
            type="number"
            name="quantity"
            placeholder="Số lượng"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <br />

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
          <br />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Có sẵn</option>
            <option value="Unavailable">Hết hàng</option>
          </select>
          <br />

          <input
            type="file"
            name="image"
            onChange={handleChange}
          />

          {formData.preview && (
            <div>
              <img src={formData.preview} alt="preview" width="100" />
            </div>
          )}
          <br />

          <button type="submit">
            {editingId ? "Cập nhật" : "Lưu món ăn"}
          </button>
        </form>
      )}

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "left" }}
      >
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
                    <img src={item.preview} alt={item.name} width="80" />
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.price} đ</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Sửa</button>{" "}
                  <button onClick={() => handleDelete(item.id)}>Xóa</button>
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
