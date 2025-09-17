import React from "react";
import { useOutletContext } from "react-router-dom";
import MonNgonPhaiThu from "./MonNgonPhaiThu";

function Thucdon() {
  const { addToCart } = useOutletContext(); // lấy từ MainLayout

  return (
    <div>
      
      <MonNgonPhaiThu addToCart={addToCart} />
    </div>
  );
}

export default Thucdon;
