import React, { Component } from 'react';
import Baner from './Baner';
import ServiceMenu from './ServiceMenu';
class Service extends Component {
    render() {
        return (
            <div>
                <Baner/>
                <ServiceMenu/>
            </div>
        );
    }
}

export default Service;