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
          <div>
          <span onClick={this.switcheroo}>
              Answer: </span>
          <span style={{'visibility': this.state.hidden ? 'hidden' : 'visible'}}>{this.props.answer}</span>
            </div>
          )
  }
}
