import React, { Component } from 'react';
import './index.css';

class About extends Component {
    render() {
        return (
           <div className="about-section">
    <img
        className="about-banner"
        src="./images/baner2.jpg"
        alt="Banner Jollibee"
    />
    <div className="about-content">
        <h2>JOLLIBEE, XIN CHÀO</h2>
        <p>
            Chúng tôi là Jollibee Việt Nam với hơn 200 cửa hàng trên khắp cả nước,
            chúng tôi mong muốn đem đến niềm vui ẩm thực cho mọi gia đình Việt bằng
            những món ăn có chất lượng tốt, hương vị tuyệt hảo, dịch vụ chu đáo với
            một mức giá hợp lý... Hãy đến và thưởng thức nhé!
        </p>
        <button>ĐẶT HÀNG</button>
    </div>
</div>

        );
    }
}

export default About;
