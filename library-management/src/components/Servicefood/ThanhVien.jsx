import React, { Component } from 'react';
import { Link } from "react-router-dom";
class ThanhVien extends Component {
    render() {
        return (
              <div>
                <div className="party-section">
  <h2 className="party-title">Thành viên</h2>

  <div className="party-combos">
    {/* Combo A */}
    <div className="combo-card">
      <img src="/images/combo1.jpg" alt="Combo A" />
      <h3>Giảm 50% </h3>
      <p className="price">Đơn từ 1.000.000</p>
      <button className="btn-order">ĐẶT HÀNG</button>
    </div>

    {/* Combo B */}
    <div className="combo-card">
      <img src="/images/combo2.jpg" alt="Combo B" />
      <h3>Tặng 1 phần bò</h3>
      <p className="price">Áp dụng bàn 4 người</p>
      <button className="btn-order">ĐẶT HÀNG</button>
    </div>

    {/* Combo C */}
    <div className="combo-card">
      <img src="/images/combo3.jpg" alt="Combo C" />
      <h3>Đi 4 tính tiền 3</h3>
      <p className="price">Từ 14h-16h</p>
      <button className="btn-order">ĐẶT HÀNG</button>
    </div>
  </div>
</div>

            </div>
        );
    }
}

export default ThanhVien;