import React from 'react';
import './App.css';
import Calendar from './helpers/Calendar'

class App extends React.Component {

  constructor() {
    super();
    this.cal = new Calendar();
    this.state = {
      // signed: false,
      calList: null
    }
  }

  componentDidMount() {
    this.cal.init();
    // this.setState({signed: this.cal.isSignedIn()})
  }

  prettyDate(datevalue) {
    let d;
    if (!(datevalue instanceof Date))
      d = new Date(datevalue);
    else d = datevalue;

    let suffix = '';
    switch (d.getDate()) {
      case 1:
        suffix = 'st';
        break;
      case 21:
        suffix = 'st';
        break;
      case 31:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 22:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      case 23:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }
    suffix += ' ';
    let mnth = '';
    switch (d.getMonth() + 1) {
      case 1:
        mnth = 'Jan';
        break;
      case 2:
        mnth = 'Feb';
        break;
      case 3:
        mnth = 'Mar';
        break;
      case 4:
        mnth = 'Apr';
        break;
      case 5:
        mnth = 'May';
        break;
      case 6:
        mnth = 'Jun';
        break;
      case 7:
        mnth = 'Jul';
        break;
      case 8:
        mnth = 'Aug';
        break;
      case 9:
        mnth = 'Sep';
        break;
      case 10:
        mnth = 'Oct';
        break;
      case 11:
        mnth = 'Nov';
        break;
      default:
        mnth = 'Dec';
        break;
    }
    mnth += ' ';
    return d.getDate() + suffix + mnth + d.getFullYear();
  }

  CL = () => this.cal.listCalendars().then((r) => this.setState({ calList: r }));
  EL() {
    this.state.calList.forEach((item) =>
      this.cal.listUpcomingEvents(item.id, 3)
        .then((r) => {
          item.events = r;
          this.setState({ calList: this.state.calList });
          console.log(this.state.calList)
        })
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Testing</h1>
        <button onClick={() => this.cal.signMeIn()}>Sign In</button>
        <button onClick={() => console.log(this.cal.isSignedIn())}>Am I signed in?</button>
        <button
          // style={{ visibility: this.state.signed ? 'visible' : 'hidden' }} 
          onClick={() => this.CL()}>List</button>
        <button
          style={{ visibility: this.state.calList ? 'visible' : 'hidden' }}
          onClick={() => this.EL()}>List Events</button>
        <ol>
          {this.state.calList ?
            this.state.calList.map(c => {
              return (
                <li key={c.id}>{c.summary}
                  <ul>
                    {c.events ?
                      c.events.map(ev => <li key={ev.id}>{ev.summary}, {this.prettyDate(ev.start.dateTime || ev.start.date)}</li>)
                      : ''}
                  </ul>
                </li>
              )
            })
            : ''}
        </ol>
      </div>
    );
  }
}

export default App;