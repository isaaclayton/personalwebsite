import React, {Component} from 'react';
import {scaleLinear} from 'd3-scale';
import {max} from 'd3-array';
import {line} from 'd3-shape';
import Point from './Point';
import Axes from './Axes';
import ToolTip from './ToolTip';

export default class WordFreq extends Component {
    
    constructor(props) {
        super(props);
        //this.mouseIn = this.mouseIn.bind(this);
        //this.mouseOut = this.mouseOut.bind(this);
        this.state =  {hover: false, data: {season: 0, ratio: 0, word_count: 0, season_count: 0, margins:this.props.margins, size: this.props.size}}
    }
    
    
    mouseIn(d) {
        if (this.state.data !== d) {
            this.setState({hover: true, data: d});
        }
    }
    
    mouseOut() {
        this.setState({hover: false});
    }

  render() {
      let seasonArray = []
      for (let i=1; i<35; i++) {
          seasonArray.push(i);
      }
      let valueArray = []
      for (let value in this.props.data) {
          valueArray.push(this.props.data[value].ratio)
      }
      const xScale = scaleLinear().domain([1, 34]).range([this.props.margins[0], this.props.size[0] - this.props.margins[0]])
      const yScale = scaleLinear().domain([0, max(valueArray)]).range([this.props.size[1] - this.props.margins[1], this.props.margins[1]])
      const countLine = line().x(d=> xScale(d.season)).y(d=>yScale(d.ratio));
      const toolTipStyle = {
          visibility: this.state.hover ? 'visible' : 'hidden',
        }
      return (
          <svg height={this.props.size[1]} width={this.props.size[0]}>
        <Axes scales={{ xScale, yScale }} margins={this.props.margins} size={this.props.size}/>
          {this.props.data.map((d,i)=><Point key={i} word_count = {d.word_count} season_count = {d.season_count} margins = {this.props.margins} size={this.props.size} season={d.season} ratio={d.ratio} xScale={xScale} yScale={yScale} mouseOut={this.mouseOut.bind(this)} mouseIn={this.mouseIn.bind(this)}/>)}
          <path d={countLine(this.props.data)} fill={'none'} stroke={'#060CE9'} strokeWidth={2}> </path>
        <text x= {this.props.size[0]/3} y= {this.props.margins[1]/2} style={{fontSize: `${this.props.margins[1]/3}px`}}>{this.props.data[0].name}</text>
        <ToolTip value={this.state.data} style_={toolTipStyle}/>
      </svg>);
  }
}