import React, { Component } from 'react';
import './home.css'
class Baner extends Component {
    render() {
        return (
            <div>
                     <div className="service-section">
    <img
        className="service-banner"
        src="./images/baner2.jpg"
        alt="Banner Jollibee"
    />
    <div className="service-content">
        <h2>DỊCH VỤ</h2>
        <p>
           TẬN HƯỞNG NHỮNG KHOẢNH KHẮC TRỌN VẸN CÙNG FOOD
        </p>
        {/* <button>ĐẶT HÀNG</button> */}
    </div>
</div>
            </div>
        );
    }
}

export default Baner;