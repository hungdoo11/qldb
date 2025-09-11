    import React, { useState, useEffect } from "react";

    function MenuItems() {
      const [menuItems, setMenuItems] = useState(() => {
        const savedItems = localStorage.getItem("menuItems");
        return savedItems ? JSON.parse(savedItems) : [];
      });

      const [showForm, setShowForm] = useState(false);
      // const [menuItems, setmenuItems] = useState([])
      const [formData, setFormData] = useState({
        name: "",
        price: "",
        quantity: "",
        category_id: "",
        image: null,
        preview: "",
      });

    const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/categories");
    const data = await res.json();
    console.log("Categories:", data); // ✅ in ra để xem
    setCategories(data);
  };
  fetchCategories();
}, []);




      // Hàm dùng chung cho tất cả input/select (trừ file)
 const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "image") {
    const file = files[0];
    setFormData({
      ...formData,
      image: file,
      preview: URL.createObjectURL(file)
    });
  } else if (name === "category_id") {
    setFormData({ ...formData, [name]: Number(value) });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};




    useEffect(() => {
      const fetchMenuItems = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/dishes");
          const data = await response.json();
          console.log(data)
          // Giả sử API trả về mảng món ăn, map sang format cần thiết
        const formattedData = data.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity || 1,
    category: item.category ? item.category.name : "", // ✅ lấy tên danh mục
    status: item.status || "Available",
    preview: item.image ? `http://127.0.0.1:8000/storage/images/${item.image}` : ""
  }));

          setMenuItems(formattedData);
        } catch (error) {
          console.error("Fetch menu items error:", error);
        }
      };

      fetchMenuItems();
    }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("name", formData.name);
  //   formDataToSend.append("price", formData.price);
  //   formDataToSend.append("quantity", formData.quantity);
  //   formDataToSend.append("category_id", formData.category_id); // cần gửi ID
  //   formDataToSend.append("status", formData.status); // thêm status

  //   if (formData.image) {
  //     formDataToSend.append("image", formData.image); // bật lại để upload ảnh
  //   }

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/dishes", {
  //       method: "POST",
  //       body: formDataToSend,
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error("Laravel validation errors:", errorData);
  //       return;
  //     }

  //     const newDish = await response.json();
  //     setMenuItems([...menuItems, newDish]); // cập nhật state

  //     // Reset form (nếu muốn)
  //     // setFormData({
  //     //   name: "",
  //     //   price: "",
  //     //   quantity: "",
  //     //   portion: "Portion",
  //     //   status: "Available",
  //     //   category_id: "",
  //     //   image: null,
  //     //   preview: ""
  //     // });
  //     // setShowForm(false);

  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //   }
  // };


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
    const response = await fetch("http://127.0.0.1:8000/api/dishes", {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Laravel validation errors:", errorData);
      return;
    }

    // ✅ Gọi lại API để lấy danh sách mới từ DB
    const res = await fetch("http://127.0.0.1:8000/api/dishes");
    const updatedData = await res.json();

    const formattedData = updatedData.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      category: item.category ? item.category.name : "",
      status: item.status || "Available",
      preview: item.image ? `http://127.0.0.1:8000/storage/images/${item.image}` : ""
    }));

    setMenuItems(formattedData);

    // Reset form
    setFormData({
      name: "",
      price: "",
      quantity: "",
      category_id: "",
      status: "Available",
      image: null,
      preview: ""
    });
    setShowForm(false);

  } catch (err) {
    console.error("Fetch error:", err);
  }
};


      return (
        <div style={{ padding: "20px" }}>
          <h2>Danh Sách Món Ăn</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{ marginBottom: "10px" }}
          >
            {showForm ? "Đóng Form" : "Thêm Món Ăn"}
          </button>

          {showForm && (
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
    <h3>Thêm Món Ăn</h3>

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
      onChange={(e) =>
        setFormData({
          ...formData,
          image: e.target.files[0],
          preview: URL.createObjectURL(e.target.files[0]),
        })
      }
    />

    {formData.preview && (
      <div>
        <img src={formData.preview} alt="preview" width="100" />
      </div>
    )}
    <br />

    <button type="submit">Lưu món ăn</button>
  </form>


          )}

          <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên món</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                  <tr key={index}>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
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
