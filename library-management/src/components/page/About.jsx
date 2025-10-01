import React, { Component } from 'react';
import './index.css';
import AOS from "aos";
import "aos/dist/aos.css";
class About extends Component {
      componentDidMount() {
        AOS.init({
          duration: 1000, // thời gian hiệu ứng
          once: true,     // chỉ chạy 1 lần
        });
      }
    render() {
        return (
           <div className="about-section" data-aos="zoom-in">
    <img
        className="about-banner"
        src="./images/baner2.jpg"
        alt="Banner FOOD"
    />
    <div className="about-content" >
        <h2>FOOD, XIN CHÀO</h2>
        <p>
            Chúng tôi là FOOD Việt Nam với hơn 200 cửa hàng trên khắp cả nước,
            chúng tôi mong muốn đem đến niềm vui ẩm thực cho mọi gia đình Việt bằng
            những món ăn có chất lượng tốt, hương vị tuyệt hảo, dịch vụ chu đáo với
            một mức giá hợp lý... Hãy đến và thưởng thức nhé!
        </p>
        {/* <button>ĐẶT HÀNG</button> */}
    </div>
</div>

        );
    }
}

export default About;
