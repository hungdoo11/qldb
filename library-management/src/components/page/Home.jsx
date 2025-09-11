import React, { Component } from 'react';
import "./index.css"
 import { FaPhoneAlt, FaEnvelope, FaShoppingCart, FaSearch } from "react-icons/fa";
import Slide from './Slide';
import Menu from './Menu';
import Service from'./Service';
import About from './About';

class Home extends Component {
    render() {
        return (
        <div>
          <Slide />
            <Menu/>
            <Service/>
            <About/>
        
        </div>
        );
    }
}

export default Home;