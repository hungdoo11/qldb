import React, { Component } from 'react';
import "./index.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

class Menu extends Component {
  componentDidMount() {
    AOS.init({
      duration: 1000, // thời gian hiệu ứng
      once: true,     // chỉ chạy 1 lần
    });
  }

  render() {
    return (
      <div>
        <div className="menu-food">
         

          <div className="menu-item" data-aos="zoom-in">
            <div className="menu-wrapper">
              <img src="/images/bgr1.jpg" alt="" className="bg" />
              <img src="/images/a1.png" alt="" className="ct" />
              <Link to="/product/1" className="menu-text">Bánh giòn ngon</Link>
            </div>
          </div>

          <div className="menu-item" data-aos="zoom-in" data-aos-delay="100">
            <div className="menu-wrapper">
              <img src="/images/bgr1.jpg" alt="" className="bg" />
              <img src="/images/a2.png" alt="" className="ct" />
              <Link to="/product/1" className="menu-text">Bánh giòn ngon</Link>
            </div>
          </div>

          <div className="menu-item" data-aos="zoom-in" data-aos-delay="200">
            <div className="menu-wrapper">
              <img src="/images/bgr1.jpg" alt="" className="bg" />
              <img src="/images/a3.png" alt="" className="ct" />
              <Link to="/product/1" className="menu-text">Bánh giòn ngon</Link>
            </div>
          </div>

          <div className="menu-item" data-aos="zoom-in" data-aos-delay="300">
            <div className="menu-wrapper">
              <img src="/images/bgr1.jpg" alt="" className="bg" />
              <img src="/images/a4.png" alt="" className="ct" />
              <Link to="/product/1" className="menu-text">Bánh giòn ngon</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
