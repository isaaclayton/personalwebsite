import React from 'react';
export default function ToolTip({value, style_}) {
    const width=120;
    const height=50;
    let x = (typeof value.xScale !== 'undefined') && (typeof value.margins !== 'undefined') ? value.xScale(value.season) - 1.05*width : 0;
    let y = (typeof value.yScale !== 'undefined') ? value.yScale(value.ratio) - 1.2*height : 0;
    if (y<value.margins[1]/2) {
        y += 1.4*height;
    }
    if (x<0) {
        x += width;
    }
  return (
      <g style={style_} transform={`translate(${x},${y})`}>
          <rect width={width} height={height} text={'hi'} fill={'#D3D3D3'}> </rect>
          <text style={{fontSize:height/4}} x={width/15} y={height/3.5}> Occurs {value.word_count} times </text>
          <text style={{fontSize:height/4}} x={width/15} y={2*height/3.5}>in the {value.season_count} words </text>
          <text style={{fontSize:height/4}} x={width/15} y={3*height/3.5}> of season {value.season} </text>
      </g>
  )
}