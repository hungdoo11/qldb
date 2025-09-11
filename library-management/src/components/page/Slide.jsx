import React, { Component } from 'react';
import "./index.css"
 import { FaPhoneAlt, FaEnvelope, FaShoppingCart, FaSearch } from "react-icons/fa";

class Slide extends Component {
    render() {
        return (
            <div>
                    {/* {sliderbar} */}
          <div className="slide">
            <div className="slide-right">
            <img src="/images/book2.png" alt="" />
            </div>
            <div className="slide-content">
              <img src="/images/slide1.jpg" alt="" />
            
              <div className="slide-content_bot">
                <div className="bot-btn">

              <button type="submit">Tham gia</button>
                </div>
              <div className="bot-icon">
               <i class="fa-solid fa-arrow-left"></i>
              <i class="fa-solid fa-arrow-right"></i>

             </div>
              </div>
            </div>
            <div className="slide-left">
            <img src="/images/book1.png" alt="" />
            </div>
          </div>
            </div>
        );
    }
}

export default Slide;