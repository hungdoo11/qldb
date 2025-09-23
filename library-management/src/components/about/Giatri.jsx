import React, { useEffect } from "react";
import "./about.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function GiaTri() {
  const values = [
    { icon: "fa-user", text: "Khách hàng là trọng tâm" },
    { icon: "fa-users", text: "Tinh thần tập thể" },
    { icon: "fa-thumbs-up", text: "Trung thực và liêm chính" },
    { icon: "fa-chart-bar", text: "Mang đến các giá trị vượt trội" },
    { icon: "fa-smile", text: "Mang tinh thần của gia đình và luôn luôn vui vẻ" },
    { icon: "fa-handshake", text: "Luôn đề cao sự tôn trọng đối với các cá nhân" },
    { icon: "fa-book", text: "Khiêm tốn lắng nghe và học hỏi" },
    { icon: "fa-money-bill", text: "Tiết kiệm" },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="values-section">
      <h2 data-aos="fade-up">CÁC GIÁ TRỊ</h2>
      <div className="values-grid">
        {values.map((item, index) => (
          <div
            key={index}
            className="value-item"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <i className={`fas ${item.icon}`}></i>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
