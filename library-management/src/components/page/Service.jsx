import React, { Component } from 'react';
import "./index.css"
import { Link } from "react-router-dom";
class Service extends Component {
    render() {
        return (
            <div>
                <div className="service-page">
                    <div className="service-page-tilte">
                        <h2>
                            Dịch Vụ
                        </h2>
                        <small>Hãy tận hưởng khoảng thắc chọn vẹn còn FOOD</small>

                    </div>
                    <div className="service-page-content">
                        <div className="service-page-content_item">
                            <div className="service-page-logo">
                                <img src="./images/food1.png" alt="" />
                            </div>
                             <div className="service-page-info">
                                <h3>
                                Tại cửa hàng
                                </h3>
                               
                             <Link to ='/thucdon'> <button type='submit'>Xem thêm</button> </Link>
                            </div>
                        </div>
                        <div className="service-page-content_item">
                            <div className="service-page-logo">
                                <img src="./images/food1.png" alt="" />
                            </div>
                            <div className="service-page-info">
                                <h3>
                                Tiệc sinh nhật
                                </h3>
                               <Link to ='/sn'> <button type='submit'>Xem thêm</button> </Link>
                                {/* <button type='submit'>Xem thêm</button> */}
                            </div>
                        </div>
                        <div className="service-page-content_item">
                            <div className="service-page-logo">
                                <img src="./images/food1.png" alt="" />
                            </div>
                             <div className="service-page-info">
                                <h3>
                                Thành viên 
                                </h3>
                               
                                <Link to ='/tv'> <button type='submit'>Xem thêm</button> </Link>
                            </div>
                        </div>
                        <div className="service-page-content_item">
                            <div className="service-page-logo">
                                <img src="./images/food1.png" alt="" />
                            </div>
                             <div className="service-page-info">
                                <h3>
                                Thành viên VIP
                                </h3>
                               
                                 <Link to ='/vip'> <button type='submit'>Xem thêm</button> </Link>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default Service;