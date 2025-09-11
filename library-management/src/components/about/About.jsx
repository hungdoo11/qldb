import React, { Component } from 'react';
import Title from './Title'
import Aboutmn from './Aboutmn';
import Noidung from './Noidung';
import GiaTri from './Giatri';
class About extends Component {
    render() {
        return (
            <div>
                <Title/>
                <Aboutmn/>
                <Noidung/>
                <GiaTri/>
            </div>
        );
    }
}

export default About;