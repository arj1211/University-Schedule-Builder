import React from 'react';
import './App.css';
import Calendar from './helpers/Calendar'

class App extends React.Component {

  constructor() {
    super();
    this.cal = new Calendar();
    this.state = {
      calList : null
    }
  }

  componentDidMount() {
    this.cal.init();
  }

  start() {
    this.cal.listCalendars().then((r) => this.setState({calList:r}));
  }

  render() {
    return (
      <div className="App">
        <h1>Testing</h1>
        <button onClick={() => this.cal.signMeIn()}>Sign In</button>
        <button onClick={() => console.log(this.cal.isSignedIn())}>Am I signed in?</button>
        <button onClick={() => this.start()}>List cals</button>
        <ol>
          {this.state.calList?
          this.state.calList.map(e => {return <li key={e.etag}>{e.summary}</li>})
        :''}
        </ol>
      </div>
    );
  }
}

export default App;