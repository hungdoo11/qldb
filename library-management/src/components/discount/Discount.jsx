import React, { Component } from 'react';
import Menu from './Menu';
import Banner from './Banner';
import './discount.css'
class Discount extends Component {
    render() {
        return (
            <div>
                <Banner/>
                <Menu/>
            </div>
        );
    }
}

export default Discount;