import React from "react";
import { useOutletContext } from "react-router-dom";
import Mnpt from "./Mnpt";

function Thucdon() {
  const { addToCart } = useOutletContext(); // lấy từ MainLayout

  return (
    <div>
      
      <Mnpt addToCart={addToCart} />
    </div>
  );
}

export default Thucdon;
