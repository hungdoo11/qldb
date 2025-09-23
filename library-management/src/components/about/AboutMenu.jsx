import React, { Component } from 'react';
import './about.css';
import AOS from "aos";
import "aos/dist/aos.css";

class Aboutmn extends Component {
  componentDidMount() {
    AOS.init({ duration: 1000, once: true });
  }

  render() {
    return (
      <div className="menu-food">
        <div className="menu-item" data-aos="fade-up">
          <div className="menu-wrapper">
            <img src="/images/ab1.jpg" alt="" className='bg' />
          </div>
        </div>
        <div className="menu-item" data-aos="fade-up" data-aos-delay="200">
          <div className="menu-wrapper">
            <img src="/images/ab3.jpg" alt="" className='bg' />
          </div>
        </div>
        <div className="menu-item" data-aos="fade-up" data-aos-delay="400">
          <div className="menu-wrapper">
            <img src="/images/ab2.jpg" alt="" className='bg' />
          </div>
        </div>
        <div className="menu-item" data-aos="fade-up" data-aos-delay="600">
          <div className="menu-wrapper">
            <img src="/images/ab4.jpg" alt="" className='bg' />
          </div>
        </div>
      </div>
    );
  }
}

export default Aboutmn;
