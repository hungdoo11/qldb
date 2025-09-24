import React, { useEffect } from 'react';
import "./index.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Service() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // thời gian hiệu ứng
      once: true,     // chỉ chạy 1 lần
    });
  }, []);

  return (
    <div className="service-page">
      <div className="service-page-tilte" data-aos="fade-up">
        <h2>Dịch Vụ</h2>
        <small>Hãy tận hưởng khoảng khắc chọn vẹn cùng sự phục vụ tận tình</small>
      </div>

      <div className="service-page-content">
        <div className="service-page-content_item" data-aos="zoom-in">
          <div className="service-page-logo">
            <img src="./images/tch.jpg" alt="" />
          </div>
          <div className="service-page-info">
            <h3>Tại cửa hàng</h3>
            <Link to="/thucdon">
              <button type="submit">Xem thêm</button>
            </Link>
          </div>
        </div>

        <div className="service-page-content_item" data-aos="zoom-in">
          <div className="service-page-logo">
            <img src="./images/sn.jpg" alt="" />
          </div>
          <div className="service-page-info">
            <h3>Tiệc sinh nhật</h3>
            <Link to="/sn">
              <button type="submit">Xem thêm</button>
            </Link>
          </div>
        </div>

        <div className="service-page-content_item" data-aos="zoom-in">
          <div className="service-page-logo">
            <img src="./images/tv.jpg" alt="" />
          </div>
          <div className="service-page-info">
            <h3>Thành viên</h3>
            <Link to="/tv">
              <button type="submit">Xem thêm</button>
            </Link>
          </div>
        </div>

        <div className="service-page-content_item" data-aos="zoom-in">
          <div className="service-page-logo">
            <img src="./images/vip.jpg" alt="" />
          </div>
          <div className="service-page-info">
            <h3>Thành viên VIP</h3>
            <Link to="/vip">
              <button type="submit">Xem thêm</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
