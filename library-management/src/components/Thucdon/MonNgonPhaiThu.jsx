  import React, { Component } from 'react';
import api from "../api/Api";
  import { useOutletContext } from "react-router-dom";
  import './menu.css';

  class MonNgonPhaiThu extends Component {
    constructor(props) {
      super(props);
      this.state = { foods: [] };
    }

    componentDidMount() {
      this.fetchFoods();
    }

  fetchFoods = async () => {
    try {
      const foods = await api.get("/dishes");
      this.setState({ foods });
    } catch (err) {
      console.error("Fetch foods error:", err);
    }
  };

  render() {
    const { foods } = this.state;
    const { addToCart } = this.props;
    console.log("Foods data:", foods); // Kiểm tra dữ liệu

    if (!addToCart) {
      console.error("addToCart is not provided as a prop");
      return <div>Error: addToCart not available</div>;
    }

    return (
      <div className="menu-td-food">
        {foods.length > 0 ? (
          foods.map(food => (
            <div
              key={food.id}
              className="menu-td-food-item"
            onClick={() => addToCart({ id: food.id, name: food.name, price: food.price, quantity: 1 })}

            >
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
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
    );
  }
  }

  // Wrapper để dùng hook trong class
  export default function MonNgonPhaiThuWithContext(props) {
    const { addToCart } = useOutletContext();
    return <MonNgonPhaiThu {...props} addToCart={addToCart} />;
  }
