import React, { Component } from 'react';
import Title from './Title'
import AboutMenu from './AboutMenu';
import Noidung from './Noidung';
import GiaTri from './Giatri';
class About extends Component {
    render() {
        return (
            <div>
                <Title/>
                <AboutMenu/>
                <Noidung/>
                <GiaTri/>
            </div>
        );
    }
}

export default About;