import React from "react";
import { useOutletContext } from "react-router-dom";
import ProductDishes from "./product";
function Thucdon() {
  const { addToCart } = useOutletContext(); // lấy từ MainLayout

  return (
    <div>
      <ProductDishes addToCart={addToCart} />
    </div>
  );
}

export default Thucdon;
