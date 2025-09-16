import React, { Component } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom"; // để lấy addToCart từ context
import "./menu.css";

class Heo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      categories: [],
      selectedCategoryId: null, // lưu id category (vd: id của "Bò Mỹ")
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchFoods();
  }

  // Lấy danh sách category
  fetchCategories = () => {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((res) => {
        const categories = res.data;

        // Tìm category "Bò Mỹ" -> lấy id
        const HeoQuay = categories.find((c) => c.name === "Heo Quay");

        this.setState({
          categories: categories,
          selectedCategoryId: HeoQuay ? HeoQuay.id : null,
        });
      })
      .catch((err) => console.error("Fetch categories error:", err));
  };

  // Lấy danh sách món ăn
  fetchFoods = () => {
    axios
      .get("http://127.0.0.1:8000/api/dishes")
      .then((res) => {
        this.setState({ foods: res.data });
      })
      .catch((err) => console.error("Fetch foods error:", err));
  };

  render() {
    const { foods, selectedCategoryId } = this.state;
    const { addToCart } = this.props;

    // Lọc món ăn theo id category
    const filteredFoods = foods.filter((food) => {
      if (typeof food.category === "object") {
        return food.category?.id === selectedCategoryId;
      }
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

// Wrapper để dùng hook trong class
export default function HeoWithContext(props) {
  const { addToCart } = useOutletContext();
  return <Heo {...props} addToCart={addToCart} />;
}
