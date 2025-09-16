import React, { Component } from 'react';
import "./home.css"
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
                                <img src="./images/food1.png" alt="" />
                            </div>
                             <div className="service-men-info">
                                <h3>
                                Tham gia ngay
                                </h3>
                               
                                <button type='submit'>Xem thêm</button>
                            </div>
                        </div>
                        <div className="service-menu-content_item">
                            <div className="service-menu-logo">
                                <img src="./images/food1.png" alt="" />
                            </div>
                            <div className="service-menu-info">
                                <h3>
                                Tham gia ngay
                                </h3>
                               
                                <button type='submit'>Xem thêm</button>
                            </div>
                        </div>
                        <div className="service-menu-content_item">
                            <div className="service-menu-logo">
                                <img src="./images/food1.png" alt="" />
                            </div>
                             <div className="service-men-info">
                                <h3>
                                Tham gia ngay
                                </h3>
                               
                                <button type='submit'>Xem thêm</button>
                            </div>
                        </div>
                        <div className="service-menu-content_item">
                            <div className="service-menu-logo">
                                <img src="./images/food1.png" alt="" />
                            </div>
                             <div className="service-men-info">
                                <h3>
                                Tham gia ngay
                                </h3>
                               
                                <button type='submit'>Xem thêm</button>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default Svmenu;