import React, { Component } from 'react';
import axios from 'axios';
import './thucdon.css';

class Mnpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: []
    };
  }

  componentDidMount() {
    this.fetchFoods();
  }

  // Hàm fetch dữ liệu từ API
  fetchFoods = () => {
    axios.get("http://127.0.0.1:8000/api/dishes")
      .then(res => {
        // API trả về mảng dish -> set vào state
        this.setState({ foods: res.data });
      })
      .catch(err => console.error("Fetch foods error:", err));
  };

  render() {
    const { foods } = this.state;

    // Lọc theo category "Món ngon phải thử"
    const filteredFoods = foods.filter(food => {
      // Nếu BE trả về object category, phải lấy food.category.name
      if (typeof food.category === "object") {
        return food.category?.name === "Món ngon phải thử";
      }
      // Nếu BE trả về string category
      return food.category === "Món ngon phải thử";
    });

    return (
      <div className="menu-td-food">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <div key={food.id || index} className="menu-td-food-item">
              <div className="menu-td-wrapper">
                <img src="/images/bgr1.jpg" alt="Background" className="bg" />
                <img
                  src={`http://127.0.0.1:8000/storage/images/${food.image}`}
                  alt={food.name}
                  className="ct"
                />
              </div>

              <div className="menu-name">{food.name}</div>
              <div className="menu-price">{food.price}đ</div>
            </div>
          ))
        ) : (
          <p>Chưa có món ăn nào.</p>
        )}
      </div>
    );
  }
}

export default Mnpt;
