import React, { Component } from "react";
import api from "../api/Api";
import { useOutletContext, useParams } from "react-router-dom"; 
import "./menu.css";

class ProductDishesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      selectedCategoryId: props.categoryId || null, 
    };
  }

  componentDidMount() {
    this.fetchFoods();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryId !== this.props.categoryId) {
      this.setState(
        { selectedCategoryId: this.props.categoryId },
        this.fetchFoods
      );
    }
  }

  // Lấy danh sách món theo category
  fetchFoods = async () => {
    try {
      const { selectedCategoryId } = this.state;
      if (!selectedCategoryId) return;

      const foods = await api.get(`/dishes/category/${selectedCategoryId}`);
      this.setState({ foods });
    } catch (err) {
      console.error("Fetch foods error:", err);
    }
  };

  render() {
    const { foods } = this.state;
    const { addToCart } = this.props;

    return (
      <div className="menu-td-food">
        {foods.length > 0 ? (
          foods.map((food) => (
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
                <img src={`http://127.0.0.1:8000/${food.image}`} alt={food.name} className="ct" />
              </div>
              <div className="menu-name">{food.name}</div>
              <div className="menu-price">{food.price}đ</div>
            </div>
          ))
        ) : (
          <p>Không có món nào trong danh mục này.</p>
        )}
      </div>
    );
  }
}

// Wrapper: lấy id từ URL và addToCart từ context
export default function ProductDishesWrapper(props) {
  const { id } = useParams();
  const { addToCart } = useOutletContext();
  return <ProductDishesBase {...props} addToCart={addToCart} categoryId={id} />;
}
