import React, { Component } from 'react';
import './svf.css'

class Snmenu extends Component {
    render() {
        return (
            <div>
                <div className="party-section">
  <h2 className="party-title">ĐẶT TIỆC SINH NHẬT</h2>

  <div className="party-combos">
    {/* Combo A */}
    <div className="combo-card">
      <img src="/images/combo1.jpg" alt="Combo A" />
      <h3>PHẦN A POPO (10 NGƯỜI)</h3>
      <p className="price">750,000 đ</p>
      <button className="btn-order">ĐẶT HÀNG</button>
    </div>

    {/* Combo B */}
    <div className="combo-card">
      <img src="/images/combo2.jpg" alt="Combo B" />
      <h3>PHẦN B TWIRLIE (10 NGƯỜI)</h3>
      <p className="price">950,000 đ</p>
      <button className="btn-order">ĐẶT HÀNG</button>
    </div>

    {/* Combo C */}
    <div className="combo-card">
      <img src="/images/combo3.jpg" alt="Combo C" />
      <h3>PHẦN C JOLLIBEE (10 NGƯỜI)</h3>
      <p className="price">1,150,000 đ</p>
      <button className="btn-order">ĐẶT HÀNG</button>
    </div>
  </div>
</div>

            </div>
        );
    }
}

export default Snmenu;