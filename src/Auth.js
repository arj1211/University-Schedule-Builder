import React from 'react';
import {creds} from './creds.js';

const CLIENT_ID = creds.CLIENT_ID;//"86631102357-gif3u8kvj06lst3i8i679oihri12iri1.apps.googleusercontent.com";
const API_KEY = creds.API_KEY;//"AIzaSyAgmo1HZO38QwYMD8QCWyzHAzla1HFtztE";
const cal_id = creds.cal_id;//'0orhuds7jlbbclu45rn35ahpdo@group.calendar.google.com';
const gapi = window.gapi;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

class Auth extends React.Component {
    state = {
        authed: false,
        events: null
    }
    componentDidMount() {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(() => {
                // Listen for sign-in state changes.
                // console.log('IN THEN');
                gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
                    this.setState({ authed: isSignedIn })
                    // console.log('JUST SET AUTHED TO: ' + this.state.authed + ' INSIDE LISTEN');
                    // if (this.state.authed)
                        this.listUpcomingEvents();
                });
                // Handle the initial sign-in state.
                this.setState({ authed: gapi.auth2.getAuthInstance().isSignedIn.get() })
                // console.log('JUST SET AUTHED TO: ' + this.state.authed);
                if (this.state.authed)
                    this.listUpcomingEvents();
            }, (error) => {
                // console.log(JSON.stringify(error, null, 2));
            });
        }
        );
    }
    handleAuthIn() {
        gapi.auth2.getAuthInstance().signIn();
        // console.log('JUST SIGNED IN?!');
        // console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
    }
    handleAuthOut() {
        gapi.auth2.getAuthInstance().signOut();
        // console.log('JUST SIGNED OUT?!');
        // console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
    }
    listUpcomingEvents() {
        // console.log('JUST CALLED LISTEVENTSTHING');
        gapi.client.calendar.events.list({
            'calendarId': cal_id,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response) => {
            var events = response.result.items;
            this.setState({ events: events });
            // console.log('THE EVENTS: ' + JSON.stringify(this.state.events));
        }, (error) => {
            this.setState({events: null});
        });
    }
    render() {
        return (
            <div>
                <h1>Auth Component</h1>
                <button
                    disabled={this.state.authed}
                    style={
                        {
                            width: '100px',
                            height: '100px',
                            backgroundColor: '#45AEA0',
                            color: 'white',
                            fontSize: 'x-large',
                            visibility: this.state.authed ? 'hidden' : 'visible'
                        }
                    }
                    onClick={() => this.handleAuthIn()}>
                    Sign In
                </button>
                <button
                    disabled={!this.state.authed}
                    style={
                        {
                            width: '100px',
                            height: '100px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            fontSize: 'x-large',
                            visibility: !this.state.authed ? 'hidden' : 'visible'
                        }
                    }
                    onClick={() => this.handleAuthOut()}>
                    Sign Out
                </button>
                <ol>
                    {
                        this.state.events ?
                            this.state.events.map(ev =>
                                <li key={ev.htmlLink}>
                                    {
                                        ev.summary
                                        + ", from " +
                                        (ev.start.dateTime || ev.start.dateTime)
                                        + " to " +
                                        (ev.end.dateTime || ev.end.dateTime)
                                    }
                                </li>)
                            : ''
                    }
                </ol>

            </div>
        );
    }
}
export default Auth;