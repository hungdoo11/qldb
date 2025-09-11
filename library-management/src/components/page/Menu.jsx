import React, { Component } from 'react';
import "./index.css"
import { Link } from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <div>
               <div className="menu-food">
                <div className="menu-item-title">
                    <img src="/images/logo.png" alt="" className="menu-logo" />
                    <h3 className="menu-title">HÔM NAY ĂN GÌ</h3>
                    <p className="menu-nd">Thực đơn Food đa dạng và phong phú, có rất nhiều sự lựa chọn cho bạn, gia đình và bạn bè</p>
                </div>
                <div className="menu-item">
                    <a href="">
                        <div className="menu-wrapper">
                            <img src="/images/bgr1.jpg" alt="" className='bg' />
                            <img src="/images/food1.png" alt="" className='ct' />
                            <Link to='thucdon' class="menu-text">Bánh giòn ngon</Link>
                            {/* <div class="menu-text">Bánh giòn ngon</div> */}
                        </div>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="">
                         <div className="menu-wrapper">
                            <img src="/images/bgr1.jpg" alt="" className='bg' />
                            <img src="/images/food1.png" alt="" className='ct' />
                            <Link to='thucdon' class="menu-text">Bánh giòn ngon</Link>
                            {/* <div class="menu-text">Bánh giòn ngon</div> */}
                        </div>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="">
                        <div className="menu-wrapper">
                            <img src="/images/bgr1.jpg" alt="" className='bg' />
                            <img src="/images/food1.png" alt="" className='ct' />
                            <Link to='thucdon' class="menu-text">Bánh giòn ngon</Link>
                            {/* <div class="menu-text">Bánh giòn ngon</div> */}
                        </div>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="">
                         <div className="menu-wrapper">
                            <img src="/images/bgr1.jpg" alt="" className='bg' />
                            <img src="/images/food1.png" alt="" className='ct' />
                            <Link to='thucdon' class="menu-text">Bánh giòn ngon</Link>
                            {/* <div class="menu-text">Bánh giòn ngon</div> */}
                        </div>
                    </a>
                </div>
               
               
                </div> 
            </div>
        );
    }
}

export default Menu;