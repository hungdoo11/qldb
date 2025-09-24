import React, { Component } from 'react';
import './svf.css';
import { Link } from "react-router-dom";
class Sinhnhat extends Component {
  render() {
    return (
      <div>
        {/* Slide */}
        <div className="slide">
          <div className="slide-right">
            <img src="/images/bo1.png" alt="" />
          </div>

          <div className="slide-content">
            <img src="/images/baner.jpg" alt="" />

            {/* Thêm đoạn text + nút */}
            <div className="slide-text">
              <h2>TIỆC VUI THẢ GA – ĂN NGON CỰC ĐÃ</h2>
              <p>
                Jollibee luôn muốn làm điều tốt đẹp nhất cho người mà Jollibee yêu quý
                nhất, còn bạn thì sao? Người bạn yêu quý nhất có phải là những thiên
                thần bé bỏng nhà mình? Bạn có muốn làm điều gì đó thật đặc biệt cho
                sinh nhật con bạn không? Nếu có thì hãy bắt tay với Jollibee để thực
                hiện kế hoạch này nhé!
              </p>
              <button className="btn-order">ĐẶT TIỆC NGAY</button>
            </div>
          </div>

          <div className="slide-left">
            <img src="/images/heo1.png" alt="" />
          </div>
        </div>

        {/* Combo Section đặt riêng bên dưới */}
        <Link to='/snmn' className="combo-link">
        <div className="combo-section">
          <div className="combo-box">
            <div className="combo-left">
              <img src="/images/heo1.png" alt="Combo Jollibee" />
            </div>

            <div className="combo-right">
              <h2>
                <span className="highlight">Combo ưng ý</span>
              </h2>
              <ul>
                <li>1 Mỳ Ý Sốt Bò Bằm + 1 ly Pepsi vừa</li>
                <li>2 Miếng gà không xương</li>
                <li>1 Khoai tây chiên vừa</li>
              </ul>
            </div>
          </div>
        </div>

        </Link>
      </div>
    );
  }
}

export default Sinhnhat;
