import React, { Component } from 'react';
import './thucdon.css'
class Nuoc extends Component {
  render() {
        // Dữ liệu mẫu
        const foods = [
            { id: 1, title: "DEAL XỊN ĐÓN LƯỢNG CHỈ 99K", img: "/images/food1.png", category: "Nước", price: "120.000đ", name: "Khoáng lạt" },
            { id: 2, title: "DEAL XỊN ĐÓN LƯỢNG CHỈ 99K", img: "/images/food1.png", category: "Nước", price: "89.000đ", name: "rựu 700namw" },
            { id: 3, title: "DEAL XỊN ĐÓN LƯỢNG CHỈ 99K", img: "/images/food1.png", category: "Nước", price: "199.000đ", name: "7up" },
            { id: 4, title: "DEAL XỊN ĐÓN LƯỢNG CHỈ 99K", img: "/images/food1.png", category: "Nước", price: "65.000đ", name: "Trà sữa tươi" },
            { id: 5, title: "DEAL XỊN ĐÓN LƯỢNG CHỈ 99K", img: "/images/food1.png", category: "Nước", price: "39.000đ", name: "Trà Đào Cam Sả" },
            { id: 6, title: "DEAL XỊN ĐÓN LƯỢNG CHỈ 99K", img: "/images/food1.png", category: "Nước", price: "49.000đ", name: "Nước lọc" },
        ];

        return (
            <div className="menu-td-food">
                {foods.map(food => (
                    <div key={food.id} className="menu-td-food-item">
                        <div className="menu-td-wrapper">
                            <img src="/images/bgr1.jpg" alt="Background" className='bg' />
                            <img src={food.img} alt={food.name} className='ct' />
                        </div>
                        {/* <div className="menu-title">{food.title}</div> */}
                        <div className="menu-name">{food.name}</div>
                        <div className="menu-price">{food.price}</div>
                        <div className="menu-category">{food.category}</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Nuoc;