import React, { Component } from 'react'
import * as d3Axis from 'd3-axis'
import {select} from 'd3-selection'

import './Axis.css'

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    const axisType = `axis${this.props.orient}`
    let axis = d3Axis[axisType]()
      .scale(this.props.scale)
      .tickSize(-this.props.tickSize)
      .ticks([this.props.numTicks])
    if ('tickValues' in this.props) {
        axis = axis.tickValues(this.props.tickValues)
    }
    if ('tickPadding' in this.props) {
        axis = axis.tickPadding(this.props.tickPadding)
    }
    select(this.axisElement).call(axis)
  }

  render() {
    let axisClass = `Axis Axis-${this.props.orient}`;
    if ('axisClass' in this.props) {
        axisClass = `Axis Axis-${this.props.orient} ${this.props.axisClass}`;
    }
    return (
      <g
        className={axisClass}
        ref={d => { this.axisElement = d; }}
        transform={this.props.translate}
      />
    )
  }
}