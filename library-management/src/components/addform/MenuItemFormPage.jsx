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
    const res = await api.get(`/dishes/${id}`);
    const item = res.data; // Lấy từ res.data
    setFormData({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category_id: item.category_id,
      status: item.status,
      image: null,
      preview: item.image_path || "",
    });
  } catch (err) {
    console.error("Fetch menu item error:", err);
  }
};
 useEffect(() => {
    fetchCategories();
    if (id) {
      fetchMenuItem(id); // nếu có id thì đang sửa
    }
  }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  // Kiểm tra formData
  if (!formData.name || !formData.price || !formData.quantity || !formData.category_id) {
    alert("Vui lòng điền đầy đủ thông tin bắt buộc");
    return;
  }

  const fd = new FormData();
  fd.append("name", formData.name);
  fd.append("price", formData.price);
  fd.append("quantity", formData.quantity);
  fd.append("category_id", formData.category_id);
  fd.append("status", formData.status);
  if (formData.image) fd.append("image", formData.image);

  try {
    if (id) {
      // Sửa món ăn: dùng POST + _method=PUT để Laravel nhận đúng
      fd.append("_method", "PUT");
      await api.post(`/admin/dishes/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      // Thêm mới món ăn
      await api.post("/admin/dishes", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    navigate("/admin/menuitems");
  } catch (err) {
    console.error("Lỗi khi lưu:", err.response?.data || err.message);
    alert(
      "Có lỗi khi lưu món ăn. Chi tiết: " +
        (err.response?.data?.message || err.message)
    );
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
