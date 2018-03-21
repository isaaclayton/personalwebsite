import React, {Component} from 'react';

export default class Answer extends Component {
    
    constructor(props) {
        super(props);
        this.switcheroo = this.switcheroo.bind(this);
        this.state =  {hidden: true}
    }
    
    switcheroo(d) {
        this.setState({hidden: this.state.hidden ? false: true})
    }

  render() {
      return (
          <div style={{'paddingBottom': '3vh'}}>
          <button style={{'fontSize': '2vh'}} onClick={this.switcheroo}>
            {this.state.hidden ? 'Show' : 'Hide'} Answer </button>
          <div style={{'visibility': this.state.hidden ? 'hidden' : 'visible'}}>{this.props.answer}</div>
            </div>
          )
  }
}
