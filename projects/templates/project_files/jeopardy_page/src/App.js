import React, {
    Component
} from 'react';
import './App.css';
import {
    csv
} from 'd3-request';
import WordFreq from './WordFreq';
import USMap from './USMap';

class App extends Component {
    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this);
        this.state = {clue_words: [], state_winnings:[], screenWidth: 1000, screenHeight: 500}
    }
    componentWillMount() {
        
        let clue_csv = require('./data_files/clue_word_list.csv');
       
        csv(clue_csv, (error, data) => {
            if(error) {
                this.setState({loadError: true});
            }
            for (let key in data) {
                for (let i=1; i<35; i++) {
                    data[key]['season'+i] = +data[key]['season'+i]
                    data[key][`season${i}_total`] = +data[key][`season${i}_total`]
            }
            }

            this.setState({
                clue_words: data
            })
        })
        
        let winnings_csv = require('./data_files/state_mean_winnings.csv');
        let statelines_json = require('./data_files/statelines.json');
        
        csv(winnings_csv, data =>
                this.setState({state_winnings: join(data, statelines_json.features, 'state', 'NAME', 
                    function(state, winnings) {
                        let property = Object.assign({}, state.properties);
                        property.winnings = (winnings !== undefined) ? winnings.winnings : 0;
                        property.longitude = (winnings !== undefined) ? winnings.longitude : 0;
                        property.latitude = (winnings !== undefined) ? winnings.latitude : 0;
                        return {
                            type: state.type,
                            geometry: state.geometry,
                            properties: property
                        };
                }
                )}));
        
            function join(winnings, state, winningsKey, stateKey, select) {
                
            const win_len = winnings.length;
            const state_len = state.length;
            let lookupIndex = [];
            let output = [];
            for (let i = 0; i < win_len; i++) {
                let row = winnings[i];
                lookupIndex[row[winningsKey]] = row;
            }
            for (let j = 0; j < state_len; j++) {
                let y = state[j];
                let x = lookupIndex[y.properties[stateKey]];
                output.push(select(y, x))
            }
            return output;
        }
        
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.onResize, false)
        this.onResize()
    }
    
    onResize() {
        this.setState({ screenWidth: window.innerWidth,
                      screenHeight: window.innerHeight - 70})
    }
    render() {
    /*if (this.state.loadError) {
      <div>couldn't load file</div>
    }
    if (!this.state.clue_words) {
      <div/>
    }*/
    let clue_words = [];
    const numWords = 6
    if (this.state.clue_words.length >0) {
    for (let j=0; j<numWords; j++) {
        let arr = []
            for (let i=1; i<35; i++) {
        arr.push({season: i, word_count: this.state.clue_words[j]['season'+i], season_count: this.state.clue_words[j][`season${i}_total`], ratio: this.state.clue_words[j]['season'+i]/this.state.clue_words[j][`season${i}_total`],
                 name: this.state.clue_words[j]['word']});
    }
    clue_words.push(<WordFreq key={j} margins={[50,60]} data={arr} size={[250,250]}/>)
    }
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
                        <p> &emsp; If you guessed "Are You Smarter Than a Fifth Grader", hosted by Jeff Foxworthy, <a href='http://www.jefffoxworthy.com/jokes'>you might be a redneck</a>, but you also might want to reconsider your answer. The correct answer is... </p>
                        <div className='title'>
                        <div className='jeopardy-word'> Jeopardy!</div>
                            <p>An analysis of the gameshow<br/> by Isaac Layton</p>
                        </div>
                    <p> &emsp; Jeopardy was a daily ritual in my family. We would gather around the TV and shout "Daily Double!", join Alex Trebek in thanking <a href='https://en.wikipedia.org/wiki/Johnny_Gilbert'>Johnny</a>, and make up rules like "Don't say the answer until the clue is fully read" (my brother and I were quick readers). </p>
                    <p>
                    </p>
                    <div>
                        {clue_words}
                    </div>
                    <div>
                        <USMap data={this.state.state_winnings} size={[this.state.screenWidth/2,this.state.screenHeight/1.5]}/>
                    </div>

                </div> 
            </div>
    );
}
}

export default App;
