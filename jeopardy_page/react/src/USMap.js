import React, { Component } from 'react';
import './App.css';
import {geoAlbersUsa, geoPath} from 'd3-geo';
import {extent} from 'd3-array';
import {scaleQuantize} from 'd3-scale';
import colorbrewer from 'colorbrewer';
import {select} from 'd3-selection';
import {rgb} from 'd3-color';
import ToolTip from './ToolTip';

export default class USMap extends Component {
    
    constructor(props) {
        super(props);
        this.createMap = this.createMap.bind(this);
        this.state = {data: {NAME:'', longitude:-111.8535, latitude:40.1135}}
    }
    
    componentDidMount() {
        this.createMap();
    }
    componentDidUpdate() {
        this.createMap();
    }
    
    createMap() {
        const node = this.node;
        let scaleFactor = 0.0028;
        if (this.props.size[0]>this.props.size[1]) {
            scaleFactor = 0.002;
        }
        else if (this.props.size[0]/this.props.size[1] < 0.44) {
            scaleFactor = 0.0023;
        }
        const projection = geoAlbersUsa()
        .scale(this.props.size[0]*this.props.size[1]*scaleFactor)
        .translate([this.props.size[0]*0.5,this.props.size[1]*0.5])
        const pathGenerator = geoPath().projection(projection);
        const featureSize = extent(this.props.data, d=> d.properties[this.props.x]);
        const stateColor = scaleQuantize().domain(featureSize).range(colorbrewer.PuBu[9]);
        select(node)
        .selectAll('g')
        .data(this.props.data)
        .enter()
        .append('g')
        .attr("class", "states")
        .append('path')
        .attr("d", pathGenerator)
        .attr("i", (d,i)=>i)
        .style("fill", d => stateColor(d.properties[this.props.x]))
        .style("stroke", d => rgb(stateColor(d.properties[this.props.x])).darker())
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
        return <svg width={this.props.size[0]} height={this.props.size[1]}>
            <g ref={node => this.node = node}></g>
            <g className={this.props.x}>
            <ToolTip data={this.state.data} textFunc={toolTipText} xyCoords={toolTipCoords} boxSize={[175, 50]} size={this.props.size} x={this.props.x}/>
            </g>
        </svg>
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
    let scaleFactor = 0.0028;
    if (size[0]>size[1]) {
        scaleFactor = 0.002;
    }
    else if (size[0]/size[1] < 0.44) {
            scaleFactor = 0.0023;
        }
    const projection = geoAlbersUsa()
        .scale(size[0]*size[1]*scaleFactor)
        .translate([size[0]*0.5,size[1]*0.5])
    const center = projection([data.longitude, data.latitude]);
    if (center[0] + width > size[0]) {
        center[0]-=width;
        if (center[0] < 0) {
        center[0]+=0.5*width;
    }
    }

    return center
}