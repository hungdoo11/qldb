import React from "react";
import { useSearch } from "../Search/UseSearch"; // từ adm/ đi lên src/ rồi vào Search

export default function AdminSearch() {
  const [search, setSearch] = useSearch();

  return (
    <input
      type="text"
      placeholder="Tìm kiếm..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "5px 10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        marginLeft: "20px",
      }}
    />
  );
}
