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
                    <p> &emsp; Since getting into data science, I've been curious about what kind of insights I could make about the show. Do contestants from certain parts of the country tend to do better? Do daily doubles improve your chances of winning the game? What kind of categories get the most wrong and right answers? Is Jeopardy getting harder or easier or staying about the same? With this project, I sought to resolve those curiosities.</p>
                    <h2> Finding a Data Source </h2>
                    <p> &emsp; I began my journey by surfing the web to see if anyone had already collected the data. I came across a dataset that a Reddit user made that looked promising, but it had no information on the contestants. I wanted to know where people were from, where they worked, and how well they did on each question. To get this information and to have information on episodes that were aired after this dataset was created, I decided that I would extract the data on my own. Thankfully, the website <a href='http://www.j-archive.com'>j-archive.com</a> has a well kept history of every episode since the 1970s. Each episode has its own page with questions, answers, and contestant information, including who answered each question right and wrong. <a href='http://www.j-archive.com/showgame.php?game_id=4591'> Here's an example.</a> </p>
                    <h2>Extracting the Data</h2>
                    <p> &emsp; I had some familiarity with the Python web parsing library <a href='https://www.crummy.com/software/BeautifulSoup/'>BeautifulSoup</a>, so I used it to parse through each season's directory page. This resulted in a list of episode URLs. Since there are more than 5,000 episodes of Jeopardy, I wasn't able to extract all of their HTML at once. I had to process one episode at a time and write them into a CSV file. From there, I had the flexibility to load it into Pandas or use another programming language like R or SQL. I needed a way to take in an episode's HTML, retrieve the relevant bits of information, and output it in a structured way. At the time I started this project, I was going through a <a href='https://www.regular-expressions.info/'>regular expression</a> phase and had confidence that using them excessively could accomplish all of the information retrieval I needed. I ended up with a somewhat working function, but it looked messy and complicated. Regular expressions are powerful, but they can make code unreadable and aren't always the best way to solve a problem. My function would gather about 95% of the questions without problem, but only as long as they fit exactly into the pattern prescribed by the regular expressions.</p>
                    <p> &emsp; I ended up doing a complete overhaul of the function, choosing instead to read up on how BeautifulSoup could accomplish the task. BeautifulSoup utilizes the page's DOM (<a href='https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction'>Document Object Model</a>) in a way that made searching for information much easier. I could search for the tags and partition the HTML in a way that felt more intuitive. The revised function ended up having less lines of code, was more readable (I still have some work to do on that aspect), and was about 2.4 times faster than the original function that used regular expressions.
                    </p>
                    <p> &emsp; Once the episode extraction function was complete, I made a generator function that would give one URL at a time to my extracting function and then output the questions into a text file. To deal with errors, I originally had the function print out every URL that didn't read correctly. It took about 5 hours to collect every question though (I had to leave 5 seconds between each collection or else the site server would reject my requests), so I would often run it overnight. If I left the error collection as it was, there were 2 problems I ran into:</p>
                    <ol>
                        <li>If I needed to exit the program or close the Jupyter tab, it wouldn't save the printed output. I would have no way of knowing which URLs didn't work.</li>
                        <li>If I ended up just leaving the computer open and running, I would have a printed list of the URLS, but it would be hard to manipulate them or troubleshoot the error.</li>
                    </ol>
                    <p>The first problem could've been solved by running the function in my AWS server using a <a href='https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/'>Linux screen</a>, but that would've still left the second problem. I ended up appending each error URL to a list variable so that I could diagnose the problems easier. This error list was then <a href='https://wiki.python.org/moin/UsingPickle'>pickled</a> to ensure that I could reference it once the function finished. Once the errors in the extraction function were fixed, all I had to do was run the generator function on the error list instead of the complete episode list. This worked by making the list smaller and smaller until I had collected all episodes.
                    </p>
                    <h2>Data Exploration</h2>
                    <p>Having gathered the data, I got to have some fun and make discoveries! Looking at </p>
                    <div className='graphics'>
                        {clue_words}
                    </div>
                    <div className='graphics'>
                        <USMap data={this.state.state_winnings} size={[this.state.screenWidth/2,this.state.screenHeight/1.5]}/>
                    </div>

                </div> 
            </div>
    );
}
}

export default App;
