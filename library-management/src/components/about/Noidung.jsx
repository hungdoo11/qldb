import React, { Component } from 'react';
import './about.css';
import AOS from "aos";
import "aos/dist/aos.css";

class Noidung extends Component {
  componentDidMount() {
    AOS.init({ duration: 1000, once: true });
  }

  render() {
    return (
      <div className="noidung">
        <div className="about-section"data-aos="zoom-in">
          <div className="about-content" >
            <h2>FOOD, XIN CHÀO</h2>
            <p style={{ color: 'black' }}>
              Chào mừng bạn đến với FOOD, nơi hội tụ tinh hoa ẩm thực Âu ngay giữa lòng thành phố! 
              Chúng tôi mang đến cho bạn những món ăn chuẩn vị như bít tết mềm ngọt, mì Ý sốt đậm đà, 
              salad tươi mát và nhiều món đặc biệt khác. <br/><br/>
              Mỗi món ăn đều được chế biến từ nguyên liệu tươi ngon, kết hợp cùng công thức chuẩn châu Âu, 
              tạo nên hương vị khó quên. <br/><br/>
              Hãy đến và trải nghiệm ẩm thực Âu chuẩn vị – chất lượng 5 sao tại FOOD ngay hôm nay!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Noidung;
