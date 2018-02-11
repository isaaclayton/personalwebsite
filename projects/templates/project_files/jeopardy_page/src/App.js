import React, {
    Component
} from 'react';
import './App.css';
import {
    csv
} from 'd3-request'
import WordFreq from './WordFreq'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {clue_words: []}
    }
    componentWillMount() {
        csv('https://raw.githubusercontent.com/isaaclayton/personalwebsite/master/projects/templates/project_files/jeopardy_page/src/data_files/clue_word_list.csv', (error, data) => {
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
        csv('https://raw.githubusercontent.com/isaaclayton/personalwebsite/master/projects/templates/project_files/jeopardy_page/src/data_files/clue_word_list.csv', (error, data) => {
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
        csv('https://raw.githubusercontent.com/isaaclayton/personalwebsite/master/projects/templates/project_files/jeopardy_page/src/data_files/clue_word_list.csv', (error, data) => {
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
    }
    render() {
    if (this.state.loadError) {
      <div>couldn't load file</div>;
    }
    if (!this.state.clue_words) {
      <div />;
    }
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
                    <p> &emsp; Jeopardy was a daily ritual in my family. We would gather around the TV and shout "Daily Double!", join Alex in thanking Johnny, and make up rules like "Don't say the answer until the clue is fully read" (my brother and I were quick readers). </p>
                    <p>
                    </p>
                    <div>
                        {clue_words}
                    </div>
                </div> 
            </div>
    );
}
}

export default App;
