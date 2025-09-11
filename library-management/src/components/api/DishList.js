import React, { useEffect, useState } from "react";
import axios from "axios";

function DishList() {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/dishes")
            .then(response => {
                setDishes(response.data);
            })
            .catch(error => {
                console.error("Có lỗi khi gọi API:", error);
            });
    }, []);

    return (
        <div>
            <h2>Danh sách món ăn</h2>
            <ul>
                {dishes.map(dish => (
                    <li key={dish.id}>
                        {dish.name} - {dish.price}đ
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DishList;
