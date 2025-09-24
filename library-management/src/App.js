import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

// FE pages
import Login from "./components/formlogin/Login";
import Register from "./components/formlogin/Register";
import Home from "./components/page/Home";
import About from "./components/about/About";
import Discount from "./components/discount/Discount";
import Service from "./components/Service/Service";
import Thucdon from "./components/Thucdon/Thucdon";
import ProductDishes from "./components/Thucdon/product";
import Sinhnhat from "./components/Servicefood/Sinhnhat";
import SinhNhatMenu from "./components/Servicefood/SinhNhatMenu";
import ThanhVien from "./components/Servicefood/ThanhVien";
import Vip from "./components/Servicefood/Vip";
import Oder from "./components/header/Oder";

// Admin pages
import AdminDashboard from "./components/adm/AdminDashboard";
import MenuItems from "./components/adm/MenuItems";
import Orders from "./components/adm/Orders";
import OrderDetail from "./components/adm/Orderdetail";
import Payment from "./components/adm/Payment";
import Revenue from "./components/adm/Revenue";
import Categories from "./components/adm/Categories";
import Customers from "./components/adm/Customers";
import Tables from "./components/adm/Tables";

//add form
import MenuItemFormPage from "./components/addform/MenuItemFormPage";
import TableFormPage from "./components/addform/TableFormPage";


// shield
import ProtectedRoute from "./components/shield/ProtectedRoute";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };
  const clearCart = () => {
  setCart([]);
};

  return (
    <BrowserRouter>
      <Routes>
        {/* Public + FE Layout */}
        <Route element={<MainLayout cart={cart} addToCart={addToCart}  />}>
        <Route path="/order" element={<Oder cartt={cart} clearCart={clearCart} />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/service" element={<Service />} />
          <Route path="/thucdon" element={<Thucdon />} />
          <Route path="/product/:id" element={<ProductDishes />} />
          <Route path="/sn" element={<Sinhnhat />} />
          <Route path="/snmn" element={<SinhNhatMenu />} />
          <Route path="/tv" element={<ThanhVien />} />
          <Route path="/vip" element={<Vip />} />
        </Route>

        {/* Admin Layout (chỉ admin level=1) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
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

        {/* addform */}

        {/* tables */}

        <Route path="/admin/tables/add" element={<TableFormPage />} />
        <Route path="/admin/tables/edit/:id" element={<TableFormPage />} />
        {/* menuiteam */}
        <Route path="/admin/menuitems/creat" element={<MenuItemFormPage />} />
        <Route path="/admin/menuitems/edit/:id" element={<MenuItemFormPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
