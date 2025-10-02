import React, { useEffect } from 'react';
import Header from '../header/Header'; // Đảm bảo đường dẫn đúng
import { Outlet } from 'react-router-dom';

function MainLayout({ cart, addToCart, user }) {
  useEffect(()=>{
  })
  return (
    <>
      <Header cart={cart} addToCart={addToCart} value={user}/> {/* Truyền cart từ props */}
      <main>
        <Outlet context={{ cart, addToCart }} /> {/* Truyền props qua Outlet */}
      </main>
    </>
  );
}

export default MainLayout;