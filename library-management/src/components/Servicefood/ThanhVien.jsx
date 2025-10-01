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
      <img src="/images/com4.webp" alt="Combo A" />
      <h3>Thu thập con dấu nhà hàng </h3>
      <p className="price">Khi dùng món tại nhà hàng</p>
      {/* <button className="btn-order">ĐẶT HÀNG</button> */}
    </div>

    {/* Combo B */}
    <div className="combo-card">
      <img src="/images/bo1.png" alt="Combo B" />
      <h3>Tặng 1 phần bò</h3>
      <p className="price">Áp dụng bàn 4 người</p>
      {/* <button className="btn-order">ĐẶT HÀNG</button> */}
    </div>

    {/* Combo C */}
    <div className="combo-card">
      <img src="/images/combo5.jpg" alt="Combo C" />
      <h3>Tặng combo sum vầy</h3>
      <p className="price">Từ 19h00 - 23h00</p>
      {/* <button className="btn-order">ĐẶT HÀNG</button> */}
    </div>
  </div>
</div>

            </div>
        );
    }
}

export default ThanhVien;