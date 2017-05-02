import React from 'react';
import { hierarchy, partition } from 'd3-hierarchy';
import { scaleOrdinal, schemeCategory10} from 'd3-scale';
import { arc } from 'd3-shape';
import ChartShell from './ChartShell';
import Arc from './Arc';

import './sunburst.scss';

export default class Sunburst extends React.Component {
    constructor(props) {
        super(props);

        this.radius = 1000; 

        this.arcGenerator = arc()
            .startAngle((d) => {
                return d.x0;
            })
            .endAngle((d) => {
                return d.x1;
            })
            .innerRadius((d) => {
                return Math.sqrt(d.y0);
            })
            .outerRadius((d) => {
                return Math.sqrt(d.y1);
            });

        this.d3PartitionLayout = partition()
            .size([2 * Math.PI, this.radius * this.radius]);

        this.color = scaleOrdinal(this.props.colors || schemeCategory10);
    }

    componentWillMount() {
        this.setState({ selected: hierarchy(this.props.data || {}) });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selected: hierarchy(nextProps.data)
        });
    }

    render() {
        return (
            <ChartShell hasData={ !!this.props.data } viewBox={-this.radius + ' ' +  -this.radius + ' ' + ((this.radius * 2)) + ' ' + ((this.radius * 2))}
                 >
                    { this.renderArcs(this.tranformToHierarchyData(this.state.selected).descendants()) }
            </ChartShell>
        );
    }

    renderArcs(data) {
        return data.map((data, index) => {
            let style = {
                fill: data.parent ? this.color((data.children ? data : data.parent).depth) : 'transparent'
            };
            //TODO fix the unqiue key of the render
            return (
                <Arc key={ data.data[this.props.displayField] }  d={ this.arcGenerator(data) } style={ style }></Arc>
            )
        });
    }

    computeTextRotation(data) {
	    return  data.depth ? (data.x0 + (data.x1 - data.x0) / 2 - Math.PI / 2) / Math.PI * 180 : 0;
    }

    computeTextTranslate(data) {
        return  data.depth ? this.arcGenerator.centroid(data) : [0,0];
    }

    shouldTextMount(data) {
        return ((data.x1 - data.x0) * this.radius / 3) > 16; 
    }

    toggleHover(data) {
        data.each((node) => { node.data.hoverOut = node.data.hover; node.data.hover = !node.data.hover; } );
        // this.setState({ hover: data.data.hover });
    }

    tranformToHierarchyData(data = []) {
        return this.d3PartitionLayout(data.copy().sum((d) => { return d[this.props.valueField]; }));
    }
}

Sunburst.defaultProps = {
    displayField: '',
    valueField: 'value'
}