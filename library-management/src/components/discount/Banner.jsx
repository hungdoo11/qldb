import React, { Component } from 'react';
import './discount.css'
class Banner extends Component {
    render() {
        return (
         <div className="about-section">
            <img
                className="about-banner"
                src="./images/baner2.jpg"
                alt="Banner Jollibee"
            />
            <div className="about-content">
                <h2>FOOD, XIN CHÀO</h2>
                {/* <p>
                   Chào mừng bạn đến với FOOD, nơi hội tụ tinh hoa ẩm thực Âu ngay giữa lòng thành phố! Chúng tôi mang đến cho bạn những món ăn chuẩn vị như bít tết mềm ngọt, mì Ý sốt đậm đà, salad tươi mát và nhiều món đặc biệt khác.

Mỗi món ăn đều được chế biến từ nguyên liệu tươi ngon, kết hợp cùng công thức chuẩn châu Âu, tạo nên hương vị khó quên. Không gian sang trọng, ấm cúng sẽ là điểm hẹn lý tưởng cho những bữa tối lãng mạn, tiệc họp mặt hay đơn giản là một ngày bạn muốn thưởng thức điều mới mẻ.

Hãy đến và trải nghiệm ẩm thực Âu chuẩn vị – chất lượng 5 sao tại FOOD ngay hôm nay!
                </p> */}
            </div>
        </div>
        );
    }
}

export default Banner;
