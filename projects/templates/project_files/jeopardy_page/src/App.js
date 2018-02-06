import React, {
    Component
} from 'react';
import './App.css';
import logo from './logo.svg'
import {
    csv
} from 'd3-request'
import Word_freq from './Word_freq'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {
        csv('/data_files/clue_word_list.csv', (error, data) => {
            if(error) {
                this.setState({loadError: true});
            }
            let data_copy = Object.assign({}, data)
            for (let i=1; i<35; i++) {
                data_copy['season'+i] = +data_copy['season'+i]
                data_copy[`season${i}_total`] = +data_copy[`season${i}_total`]
            }
            this.setState({
                clue_words: data_copy
            })
        })
    }
    render() {
    if (this.state.loadError) {
      <div>couldn't load file</div>;
    }
    if (!this.state.clue_words) {
      <div />;
    }
    let clue_words = {x: [], y: []}
    for (let i=1; i<35; i++) {
        clue_words.x.push(i)
        clue_words.y.push(this.state.clue_words['season'+i][0])
    }
        return (
            <div id = 'wrapper'>
                <link href = "https://fonts.googleapis.com/css?family=PT+Sans" rel = "stylesheet" />
                <div id = 'header_wrapper'>
                <div id = 'jeopardy-intro'/>
                <header id = "App-header">
                <h1> THIS 34 YEAR OLD TELEVISION SERIES IS KNOWN AS "AMERICA'S FAVORITE QUIZ SHOW" </h1>
                </header> 
                </div>
                <div id ='bodyWrapper'>
                    <div className = 'introduction' >
                        <p> If you answered "Are You Smarter Than a Fifth Grader" by </p> 
                    </div>
                    <div>
                        {

    <div style={{
      background: '#fff',
      borderRadius: '3px',
      boxShadow: '0 1 2 0 rgba(0,0,0,0.1)',
      margin: 12,
      padding: 24,
      width: '350px'
    }}>
      <h1>Birth and death rates of selected countries</h1>
      <h2>per 1,000 inhabitants</h2>
      <Word_freq data={clue_words}/>
    </div>
  }
                    </div>
                </div> 
            </div>
    );
}
}

export default App;
