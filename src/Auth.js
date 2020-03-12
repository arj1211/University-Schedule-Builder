import React from 'react';
import { creds } from './creds.js';

const CLIENT_ID = creds.CLIENT_ID;
const API_KEY = creds.API_KEY;
const cal_id = creds.cal_id;
const gapi = window.gapi;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

class Auth extends React.Component {
    state = {
        authed: false,
        events: null
    }
    buttonStyle = () => {
        return ({
            width: '100px',
            height: '100px',
            backgroundColor: this.state.authed ? '#4d0000' : '#006600',
            color: 'white',
            fontSize: 'x-large'
        })
    };
    componentDidMount() {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(() => {
                gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
                    this.setState({ authed: isSignedIn })
                    this.listUpcomingEvents();
                });
                this.setState({ authed: gapi.auth2.getAuthInstance().isSignedIn.get() })
                if (this.state.authed)
                    this.listUpcomingEvents();
            }, (error) => {
            });
        }
        );
    }

    handleAuthIn = () => {
        gapi.auth2.getAuthInstance().signIn();
        this.setState({ authed: true });
    }

    handleAuthOut = () => {
        gapi.auth2.getAuthInstance().signOut();
        this.setState({ authed: false });
    }

    listUpcomingEvents() {
        gapi.client.calendar.events.list({
            'calendarId': cal_id,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            // 'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response) => {
            let events = response.result.items;
            this.setState({ events: events });
        }, (error) => {
            this.setState({ events: null });
        });
    }

    prettyDate(d) {
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

    render() {
        return (
            <div>
                <h1>Auth Component</h1>
                <button style={this.buttonStyle()}
                    onClick={() => { this.state.authed ? this.handleAuthOut() : this.handleAuthIn() }}>
                    Sign {this.state.authed ? 'Out' : 'In'}
                </button>
                <ol style={{ textAlign: 'left' }}>
                    {this.state.events ?
                        this.state.events.map(
                            ev => {
                                let start = new Date(ev.start.dateTime || ev.start.date);
                                let end = new Date(ev.end.dateTime || ev.end.date);
                                let start_str = ", from ";
                                start_str += this.prettyDate(start) + ' ' + start.toLocaleTimeString();
                                let end_str = " to ";
                                end_str += this.prettyDate(end) + ' ' + end.toLocaleTimeString();
                                let date = start_str + end_str;
                                return (<li key={ev.htmlLink}>{ev.summary + date}</li>)
                            }
                        )
                        : ''
                    }
                </ol>
            </div>
        );
    }
}
export default Auth;
