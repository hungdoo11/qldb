import React, { Component } from "react";
import api from "../api/Api";
import { useOutletContext } from "react-router-dom"; // để lấy addToCart từ context
import "./menu.css";

class Nuoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      selectedCategoryId: null, // id của category "Thức uống"
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchFoods();
  }

  // Lấy categories từ API
    fetchCategories = async () => {
    try {
      const categories = await api.get("/categories");
      const Nuoc = categories.find((c) => c.name === "Thức uống");
      this.setState({
        categories,
        selectedCategoryId: Nuoc ? Nuoc.id : null,
      });
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  // Lấy danh sách món
 fetchFoods = async () => {
    try {
      const foods = await api.get("/dishes");
      this.setState({ foods });
    } catch (err) {
      console.error("Fetch foods error:", err);
    }
  };

  render() {
    const { foods, selectedCategoryId } = this.state;
    const { addToCart } = this.props;

    // Lọc món theo category_id
    const filteredFoods = foods.filter((food) => {
      // Nếu API trả về food.category là object
      if (typeof food.category === "object" && food.category !== null) {
        return food.category.id === selectedCategoryId;
      }
      // Nếu API trả về food.category_id
      return food.category_id === selectedCategoryId;
    });

    return (
      <div className="menu-td-food">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div
              key={food.id}
              className="menu-td-food-item"
              onClick={() =>
                addToCart({
                  id: food.id,
                  name: food.name,
                  price: parseFloat(food.price),
                  image: food.image,
                })
              }
            >
              <div className="menu-td-wrapper">
                {/* <img src="/images/bgr1.jpg" alt="Background" className="bg" /> */}
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
          <p>Chưa có món nước nào.</p>
        )}
      </div>
    );
  }
}

// Wrapper để dùng hook trong class component
export default function NuocWithContext(props) {
  const { addToCart } = useOutletContext();
  return <Nuoc {...props} addToCart={addToCart} />;
}
