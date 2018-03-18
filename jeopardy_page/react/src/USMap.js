import React, { Component } from 'react';
import './App.css';
import {geoAlbersUsa, geoPath} from 'd3-geo';
import {extent, range} from 'd3-array';
import {scaleQuantize, scaleLinear} from 'd3-scale';
import colorbrewer from 'colorbrewer';
import {select} from 'd3-selection';
import {rgb} from 'd3-color';
import {transition} from 'd3-transition';
import ToolTip from './ToolTip';
import Axis from './Axis'

export default class USMap extends Component {
    
    constructor(props) {
        super(props);
        this.createMap = this.createMap.bind(this);
        this.state = {data: {NAME:'', longitude:-111.8535, latitude:40.1135},
                     tooltipSize: [175,50],
                     extent: [0,100],
                     quantizeScale: scaleQuantize().domain([0,0]).range(colorbrewer.PuBu[9]),
                     linearScale: scaleLinear().domain([0,0]).range([0,500*.75]),
                     count:0,
                     }
    }
    
    componentDidMount() {
        this.createMap();
    }
    componentDidUpdate() {
        this.createMap();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.data!==nextProps.data) {
            const nextExtent = extent(nextProps.data, d=> d.properties[nextProps.x]);
            this.setState({extent: nextExtent,});
            this.setState({
                quantizeScale: scaleQuantize().domain(nextExtent).range(colorbrewer.PuBu[9]),
                linearScale: scaleLinear().domain(nextExtent).range([0,nextProps.size[0]*.75])
            })
                          
            if(nextProps.size[0] < 500) {
                this.setState({tooltipSize: [150, 50]});
            }
            this.setState({count: 1});
        }
    }
    
    createMap() {
        const node = this.node;
        let scaleFactor = 1.375*this.props.size[0];
        const projection = geoAlbersUsa()
        .scale(scaleFactor)
        .translate([this.props.size[0]*0.5,this.props.size[1]*0.5])
        const pathGenerator = geoPath().projection(projection);
        if(this.state.count === 1) {
            let stateColor = this.state.quantizeScale;
            let linear = this.state.linearScale;
            select(`g.${this.props.x}-Axis`).selectAll('rect')
                    .data(this.state.quantizeScale.range().map(function(color) {
                                    let d = stateColor.invertExtent(color);
                                    if (d[0] === null) d[0] = linear.domain()[0];
                                    if (d[1] === null) d[1] = linear.domain()[1];
                                    return d;
                                    }))
                    .enter()
                    .insert('rect', '.tick')
                    .attr('height', 8)
                    .attr('x', d=>  linear(d[0]))
                    .attr('width', d=> linear(d[1]) - linear(d[0]))
                    .attr('fill', d=> stateColor(d[0]));
        }
        select(node)
        .selectAll('g')
        .data(this.props.data)
        .enter()
        .append('g')
        .attr("class", "states")
        .append('path')
        .attr("d", pathGenerator)
        .attr("i", (d,i)=>i)
        .style("fill", d => this.state.quantizeScale(d.properties[this.props.x]))
        .style("stroke", d => rgb(this.state.quantizeScale(d.properties[this.props.x])).darker())
        .on('mouseover', mouseover.bind(this))
        .on('mouseout', mouseout.bind(this));
        
        select('g.'+this.props.x)
            .attr('class', this.props.x)
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('text-align', 'center')
            .style('width', '150px')
            .style('height', '40px')
            .style('padding', '2px')
            .style('font', '12px')
            .style('background', 'lightsteelblue')
            .style('border', '0px')
            .style('pointer-events', 'none')
        
        function mouseover(d) {
            this.setState({data:d.properties})
            select('g.'+this.props.x)
                    .style('opacity', .9)
                    .transition().duration(200);
            
        }
        function mouseout() {
            select('g.'+this.props.x)
                .transition()
                .duration(500)
                .style('opacity',0)
        }
    }
    
    render() {
        return (
            <svg 
                width={this.props.size[0]} 
                height={this.props.size[1]}>
            <g id = 'legend'>
            <Axis
                orient={'Bottom'}
                scale={this.state.linearScale}
                translate={`translate(${this.props.size[0]*.06}, ${this.props.size[1]*0.03})`}
                tickSize={5}
                numTicks={8}
                tickValues={valueRange(this.state.extent[0], this.state.extent[1], 9)}
                axisClass={`${this.props.x}-Axis`}
                tickPadding={this.props.size[1]*0.05}
                /> 
             </g>
            <g 
                ref={node => this.node = node}
                transform={`translate(0,${this.props.size[1]*0.04})`}>
            </g>
            <g className={this.props.x}>
            <ToolTip data={this.state.data} textFunc={toolTipText} xyCoords={toolTipCoords} boxSize={this.state.tooltipSize} size={this.props.size} x={this.props.x}/>
            </g>
        </svg>
        )
    }
}

             
function toolTipText({width=0, height=0, data, x}) {
            return (
                <g>
                    <text style={{fontSize:height/4}} x={width/15} y={height/2.5}> State: {data.NAME} </text>
                    <text style={{fontSize:height/4}} x={width/15} y={2*height/2.5}>{x==='streak' ? 'Average Streak' : 'Win Rate'}: {
                x === 'streak' ? (Math.floor(data[x]*100)/100 + ' days') :
                (data[x]===0 ? "no data available" : Math.floor(data[x]*100) + "%")} </text>
                </g>
            )
}
        
function toolTipCoords({width=0, height=0, data, size}) {
    let scaleFactor = 1.375*size[0];
    const projection = geoAlbersUsa()
        .scale(scaleFactor)
        .translate([size[0]*0.5,size[1]*0.5])
    const center = projection([data.longitude, data.latitude]);
    center[1]+=size[1]*.04;
    if (center[0] + width > size[0]) {
        center[0]-=width;
        if (center[0] < 0) {
            center[0]+=0.5*width;
    }
    }
    if (center[1] + height > size[1]) {
        center[1]-=height;
        if (center[1] < 0) {
            center[1]+=0.5*height;
        }
    }

    return center
}

function valueRange(min, max, sections) {
    let a = [];
    let block = (max-min)/sections;
    for (let i=0; i<sections; i++) {
        a.push(i*block);
    }
    return a;
}