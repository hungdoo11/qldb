import React, { Component } from 'react';
import "./home.css"
import { Link } from "react-router-dom";
class Svmenu extends Component {
    render() {
        return (
            <div>
                <div className="service-menu">
                    <div className="service-menu-tilte">
                        <h2>
                            Dịch Vụ
                        </h2>
                        <small>Hãy tận hưởng khoảng thắc chọn vẹn còn FOOD</small>

                    </div>
                    <div className="service-menu-content">
                        <div className="service-menu-content_item">
                            <div className="service-menu-logo">
                                <img src="./images/tch.jpg" alt="" />
                            </div>
                             <div className="service-men-info">
                                <h3>
                               Tại cửa hàng
                                </h3>
                               
                                 <Link to="/product/1">
                                <button type="submit">Xem thêm</button>
                                  </Link>
                            </div>
                        </div>
                        <div className="service-menu-content_item">
                            <div className="service-menu-logo">
                                <img src="./images/sn.jpg" alt="" />
                            </div>
                            <div className="service-menu-info">
                               <h3>Tiệc sinh nhật</h3>
                                           <Link to="/sn">
                                             <button type="submit">Xem thêm</button>
                                           </Link>
                            </div>
                        </div>
                        <div className="service-menu-content_item">
                            <div className="service-menu-logo">
                                <img src="./images/tv.jpg" alt="" />
                            </div>
                             <div className="service-men-info">
                               <h3>Thành viên</h3>
                                         <Link to="/tv">
                                           <button type="submit">Xem thêm</button>
                                         </Link>
                            </div>
                        </div>
                        <div className="service-menu-content_item">
                            <div className="service-menu-logo">
                                <img src="./images/vip.jpg" alt="" />
                            </div>
                             <div className="service-men-info">
                                <h3>Thành viên VIP</h3>
                                           <Link to="/vip">
                                             <button type="submit">Xem thêm</button>
                                           </Link>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default Svmenu;