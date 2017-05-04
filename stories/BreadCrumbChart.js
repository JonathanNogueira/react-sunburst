import React from 'react';
import BreadCrumb from '../src/BreadCrumb';
import Sunburst from '../src/sunburst';
import Resizable from './Resizable';

export default class BreadCrumbChart extends React.Component {
    state = {
        hover: ['']
    }
    
    render() {
        return (
            <Resizable>
                <Sunburst data={ this.props.data } onMouseOver={ this.arcHover }></Sunburst>
                <BreadCrumb path={ this.state.hover }></BreadCrumb>
            </Resizable>
        );
    }

    arcHover = (data) => {
        console.log('hover');
        this.setState({
            hover: [ data.name ]
        });
    }
}; 
