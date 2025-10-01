import React, { Component } from 'react';

class Vip extends Component {
    render() {
        return (
             <div>
                <div className="party-section">
  <h2 className="party-title">Thành viên VIP</h2>

  <div className="party-combos">
    {/* Combo A */}
    <div className="combo-card">
      <img src="/images/bo1.png" alt="Combo A" />
      <h3>Tặng 1 phần bò </h3>
      <p className="price">Từ 18h-20h</p>
      {/* <button className="btn-order">ĐẶT HÀNG</button> */}
    </div>

    {/* Combo B */}
    <div className="combo-card">
      <img src="/images/qua.jpg" alt="Combo B" />
      <h3>Phần quà theo chủ đề</h3>
      <p className="price">Áp dụng tất cả cửa hàng</p>
      {/* <button className="btn-order">ĐẶT HÀNG</button> */}
    </div>

    {/* Combo C */}
    <div className="combo-card">
      <img src="/images/combohd.png" alt="Combo C" />
      <h3>Tặng combo hủy duyệt (bàn 8 người)</h3>
      <p className="price">Từ 14h-16h</p>
      {/* <button className="btn-order">ĐẶT HÀNG</button> */}
    </div>
  </div>
</div>

            </div>
        );
    }
}

export default Vip;