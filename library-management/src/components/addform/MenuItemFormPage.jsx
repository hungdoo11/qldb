import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/Api";
import "./form.css"

function MenuItemFormPage() {
  const { id } = useParams(); // lấy id từ url (nếu có)
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchMenuItem(id); // nếu có id thì đang sửa
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  const fetchMenuItem = async (id) => {
    try {
      const item = await api.get(`/dishes/${id}`);
      setFormData({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category_id: item.category_id,
        status: item.status,
        image: null,
        preview: item.image_path,
      });
    } catch (err) {
      console.error("Fetch menu item error:", err);
    }
  };

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
      console.log(formData.image)
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
      if (id) {
        fd.append("_method", "PUT");
        await api.post(`/dishes/${id}`, fd);
      } else {
        await api.post("/admin/dishes", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
      }
      navigate("/admin/menuitems"); 
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
    }
  };

 return (
  <div className="form-container">
    <h2>{id ? "Sửa món ăn" : "Thêm món ăn"}</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Tên món ăn"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Giá"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="quantity"
        placeholder="Số lượng"
        value={formData.quantity}
        onChange={handleChange}
        required
      />

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

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Available">Có sẵn</option>
        <option value="Unavailable">Hết hàng</option>
      </select>

      <input type="file" name="image" onChange={handleChange} />

      {formData.preview && (
        <div className="preview-container">
          <img src={formData.preview} alt="preview" />
        </div>
      )}

      <div className="button-group">
        <button type="submit" className="btn-submit">
          {id ? "Cập nhật" : "Lưu"}
        </button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => navigate("/admin/menuitems")}
        >
          Hủy
        </button>
      </div>
    </form>
  </div>
);

}

export default MenuItemFormPage;
