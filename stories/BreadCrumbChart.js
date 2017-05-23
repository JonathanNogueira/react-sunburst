import React from 'react';
import BreadCrumb from '../src/BreadCrumb';
import Sunburst from '../src/sunburst';

export default class BreadCrumbChart extends React.Component {
    state = {
        hover: ['']
    }
    
    render() {
        return (
            <div style={ {width: 300, height: 400} }>
                <div>
                    <Sunburst valueField={ this.props.valueField } data={ this.props.data } onMouseArcOut={ this.arcOut } 
                    onMouseArcOver={ this.arcHover }></Sunburst>
                </div>   
                <BreadCrumb path={ this.state.hover }></BreadCrumb>
            </div>
        );
    }

    arcHover = (data) => {
        let path = '', 
            ancestors = data.ancestors();

        for(var i = 0; i < ancestors.length; i++) {
            let name = ancestors[i].data.name;

            path += i < ancestors.length - 1 ? name + ' -> ' : name; 
        }
        this.setState({
            hover: [ path ]
        });
    }

    arcOut = (data) => {
        this.setState({
            hover: ['']
        });
    }
}; 
