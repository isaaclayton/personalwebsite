import React, { Component } from 'react';
import './App.css';
import {geoAlbersUsa, geoPath} from 'd3-geo';
import {extent} from 'd3-array';
import {scaleQuantize} from 'd3-scale';
import colorbrewer from 'colorbrewer';
import {select, selectAll} from 'd3-selection';
import {rgb} from 'd3-color';
import {transition} from 'd3-transition';
import ToolTip from './ToolTip';

export default class USMap extends Component {
    
    constructor(props) {
        super(props);
        const x = this.props.x;
        this.createMap = this.createMap.bind(this);
        this.mouseover = this.mouseover.bind(this);
        this.mouseout = this.mouseout.bind(this);
        this.state = {data: {latitude: 40.1135, longitude: -111.8535, size: this.props.size, NAME: ''}}
    }
    
    componentDidMount() {
        this.createMap()
    }
    componentDidUpdate() {
        this.createMap()
    }
    
    mouseover(d) {
        let update = select('g.'+this.x)
        update.style('opacity', .9)
                .style('visibility', 'visible')
        update.transition().duration(200);
        this.setState({data:d.properties})
    }

    mouseout() {
        let update = select('g.'+this.x)
        update.transition()
                .duration(500)
                .style('opacity',0)
    }
    
    createMap() {
        const node = this.node;
        let scaleFactor = 0.0021;
        if (this.props.size[0]>this.props.size[1]) {
            scaleFactor = 0.003;
        }
        else if (this.props.size[0]/this.props.size[1] < 0.44) {
            scaleFactor = 0.003;
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
        let state_class = selectAll('g.states');
        state_class
                .append('path')
                .attr("d", pathGenerator)
                .attr("i", (d,i)=>i)
                .style("fill", d => stateColor(d.properties[this.props.x]))
                .style("stroke", d => rgb(stateColor(d.properties[this.props.x])).darker());
        /*select(node).append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);
        let div = select('div.tooltip')
        select(node).append('ToolTip')
            .attr('class', 'tooltip')
            .attr('boxSize', [175, 50])
            .attr('size', this.props.size)
            .attr('x', this.props.x)
            .attr('textFunc', toolTipText)
            .attr('xyCoords', toolTipCoords)
            .attr('data', {latitude: 40.1135, longitude: -111.8535, size: this.state.data, NAME: ''})
            .style('opacity', 0)*/

        state_class
            .on('mouseover', this.mouseover)
            .on('mouseout', this.mouseout)
        
        /*function mouseover(d) {
            let long_lat = projection([d.properties.longitude, d.properties.latitude]);
            div.style('opacity', .9)
            div.transition().duration(200);
            div.html('State:' + d.properties.NAME + '</br>'
                    + 'Average winnings: $' + d.properties[this.props.x])
                .style('left', long_lat[0] + 'px')
                .style('top', long_lat[1] + 'px')
        }
        function mouseout() {
            div.transition()
                .duration(500)
                .style('opacity',0)
        }*/
    }
    
    render() {
        return <svg width={this.props.size[0]} height={this.props.size[1]}>
            <g ref={node => this.node = node}></g>
            <ToolTip data={this.state.data} style_={{opacity: 0,visibility:'hidden'}} textFunc={toolTipText} xyCoords={toolTipCoords} boxSize={[175, 50]} size={this.props.size} x={this.props.x} className={this.props.x}/>
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
    let scaleFactor = 0.0021;
    if (size[0]>size[1]) {
        scaleFactor = 0.003
    }
    else if (size[0]/size[1] < 0.44) {
            scaleFactor = 0.0015
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