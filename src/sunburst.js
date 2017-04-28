import React from 'react';
import { hierarchy, partition } from 'd3-hierarchy';
import { scaleOrdinal, schemeCategory20} from 'd3-scale';
import { arc } from 'd3-shape';
import './sunburst.scss';

export default class Sunburst extends React.Component {
    constructor(props) {
        super(props);

        this.radius = 400; 

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

        this.color = scaleOrdinal(this.props.colors || schemeCategory20);
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
            <svg className={ 'fade-in' } viewBox={-this.radius + ' ' +  -this.radius + ' ' + ((this.radius * 2)) + ' ' + ((this.radius * 2))}
                preserveAspectRatio="xMidYMid meet">
                { this.props.data ? (
                    <g> { this.renderArcs([this.tranformToHierarchyData(this.state.selected)]) } </g>
                ) : (
                    <text> No Data </text>
                ) }
            </svg>
        );
    }

    renderArcs(data) {
        return data.map((data, index) => { 
            let style = {
                fill: this.color((data.children ? data : data.parent).depth)
            };
            //TODO fix the unqiue key of the render
            return <g key={ data.data[this.props.displayField] }  className='arc-group fade-in' >
                        <g className='arc-path' onClick={ this.props.onClick }>
                            <path d={ this.arcGenerator(data) } style={ style }>
                            </path>
                 
                                <text transform={'translate(' + this.computeTextTranslate(data) + ')rotate(' + this.computeTextRotation(data) + ')'}>
                                    {data.data[this.props.displayField]}
                                </text>
                
                        </g>
                        { data.children && this.renderArcs(data.children) }
                    </g>; 
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
    valueField: 'value' //TODO fix supoort for different values
}