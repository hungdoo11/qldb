import React, { useState } from "react";

export default function CategoryForm({ onAdd }) {
  const [newCate, setNewCate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCate.trim()) return;
    onAdd(newCate);
    setNewCate("");
  };

  return (
    <form className="cate-form" onSubmit={handleSubmit}>
      <input
        value={newCate}
        onChange={(e) => setNewCate(e.target.value)}
        placeholder="Tên danh mục"
      />
      <button type="submit">Thêm</button>
    </form>
  );
}
