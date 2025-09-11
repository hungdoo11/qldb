import React, { useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState(["Món chính", "Đồ uống"]);
  const [newCate, setNewCate] = useState("");

  const addCate = () => {
    if (newCate) {
      setCategories([...categories, newCate]);
      setNewCate("");
    }
  };

  return (
    <div>
      <h2>Quản lý Danh mục</h2>
      <input
        value={newCate}
        onChange={(e) => setNewCate(e.target.value)}
        placeholder="Tên danh mục"
      />
      <button onClick={addCate}>Thêm</button>
      <ul>
        {categories.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
