import React, { Component } from "react";
import api from "../api/Api";
import { useOutletContext, useParams } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
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
            <div key={food.id} className="menu-card">
              <div className="menu-img-wrapper">
                <img
                  src={`http://127.0.0.1:8000/${food.image}`}
                  alt={food.name}
                  className="menu-img"
                />
                <div className="menu-badge">🔥 Món nổi bật</div>

                <div className="menu-overlay">
                  <button
                    className="menu-add-btn"
                    onClick={() =>
                      addToCart({
                        id: food.id,
                        name: food.name,
                        price: parseFloat(food.price),
                        image: food.image,
                      })
                    }
                  >
                    <FaShoppingCart size={18} /> Thêm vào giỏ
                  </button>
                </div>
              </div>

              <div className="menu-info">
                <div className="menu-name">{food.name}</div>
               
                <div className="menu-price">
                  {parseFloat(food.price).toLocaleString()}đ
                </div>
               
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">Không có món nào trong danh mục này.</p>
        )}
      </div>
    );
  }
}

export default function ProductDishesWrapper(props) {
  const { id } = useParams();
  const { addToCart } = useOutletContext();
  return <ProductDishesBase {...props} addToCart={addToCart} categoryId={id} />;
}
