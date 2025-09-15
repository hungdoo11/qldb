import React, { useState, useEffect } from "react";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // ✅ để biết đang sửa món nào

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category_id: "",
    status: "Available",
    image: null,
    preview: "",
  });

  const [categories, setCategories] = useState([]);

  // Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Lấy danh sách món ăn
  const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/dishes");
      const data = await response.json();

      const formattedData = data.map((item) => ({
        id: item.id, // ✅ giữ id để sửa/xóa
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        category: item.category ? item.category.name : "",
        category_id: item.category_id,
        status: item.status || "Available",
        preview: item.image
          ? `http://127.0.0.1:8000/storage/images/${item.image}`
          : "",
      }));

      setMenuItems(formattedData);
    } catch (error) {
      console.error("Fetch menu items error:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    } else if (name === "category_id") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Thêm hoặc Cập nhật món ăn
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("price", formData.price);
  formDataToSend.append("quantity", formData.quantity);
  formDataToSend.append("category_id", formData.category_id);
  formDataToSend.append("status", formData.status);

  if (formData.image) {
    formDataToSend.append("image", formData.image);
  }

  try {
    let url = "http://127.0.0.1:8000/api/dishes";
    let method = "POST";

    if (editingId) {
      // ✅ Update món ăn
      url = `http://127.0.0.1:8000/api/dishes/${editingId}`;
      method = "POST"; 
      formDataToSend.append("_method", "PUT"); // Laravel sẽ hiểu là PUT
    }

    const response = await fetch(url, {
      method,
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Validation errors:", errorData);
      return;
    }

    await fetchMenuItems(); // load lại danh sách

    // Reset form
    setFormData({
      name: "",
      price: "",
      quantity: "",
      category_id: "",
      status: "Available",
      image: null,
      preview: "",
    });
    setEditingId(null);
    setShowForm(false);

  } catch (err) {
    console.error("Fetch error:", err);
  }
};


  // Sửa món ăn
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category_id: item.category_id,
      status: item.status,
      image: null,
      preview: item.preview,
    });
    setShowForm(true);
  };

  // Xóa món ăn
  const handleDelete = async (id) => {
  if (!window.confirm("Bạn có chắc muốn xóa món này?")) return;

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/dishes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await fetchMenuItems(); // load lại danh sách sau khi xóa
    } else {
      const err = await response.json();
      console.error("Delete error:", err);
    }
  } catch (err) {
    console.error("Fetch error:", err);
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
