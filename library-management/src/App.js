
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/adm/AdminLayout";

// FE
import Login from "./components/formlogin/Login";
import Register from "./components/formlogin/Register";
import Home from './components/page/Home';
import About from './components/about/About';
import Discount from './components/discount/Discount';
import Service from './components/Service/Service';
import Thucdon from './components/Thucdon/Thucdon';
import Bo from './components/Thucdon/Bo';
import Heo from './components/Thucdon/Heo';
import Com from './components/Thucdon/Com';
import Nuoc from './components/Thucdon/Nuoc';
import Sinhnhat from './components/Servicefood/Sinhnhat';
import Snmenu from './components/Servicefood/Snmenu';
import Tv from './components/Servicefood/Tv';
import Vip from './components/Servicefood/Vip';

// Admin
import AdminDashboard from "./components/adm/AdminDashboard";
import MenuItems from "./components/adm/MenuItems";
import Orders from "./components/adm/Orders";
import OrderDetail from "./components/adm/Orderdetail";
import Payment from "./components/adm/Payment";
import Revenue from "./components/adm/Revenue";
import Categories from "./components/adm/Categories";
import Customers from "./components/adm/Customers";
import Tables from "./components/adm/Tables";

// API demo
import DishList from "./components/api/DishList";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }
      console.log("Cart after add:", newCart); // 👈 log giỏ hàng thực sự
      return newCart;
    });
  };
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route
          element={<MainLayout cart={cart} addToCart={addToCart} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/service" element={<Service />} />
          <Route path="/thucdon" element={<Thucdon />} />
          <Route path="/bo" element={<Bo />} />
          <Route path="/heo" element={<Heo />} />
          <Route path="/com" element={<Com />} />
          <Route path="/nuoc" element={<Nuoc />} />
          <Route path="/sn" element={<Sinhnhat />} />
          <Route path="/snmn" element={<Snmenu />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/vip" element={<Vip />} />
          <Route path="/dishes" element={<DishList />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menuitems" element={<MenuItems />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orderdetail" element={<OrderDetail />} />
          <Route path="payment" element={<Payment />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="categories" element={<Categories />} />
          <Route path="customers" element={<Customers />} />
          <Route path="tables" element={<Tables />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
