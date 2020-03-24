import { creds } from '../creds.js';
const CLIENT_ID = creds.CLIENT_ID;
const API_KEY = creds.API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const initObj = {
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
};

export default class Calendar {

    init() {
        console.log('got into Calendar.init');
        window.gapi.load('client:auth2', this.startAuth);
    }

    startAuth() {
        console.log('got into Calendar.startAuth');
        window.gapi.client.init(initObj);
    }

    signMeIn() {
        window.gapi.auth2.getAuthInstance().signIn();
        console.log('just signed in?: ' + window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }

    signMeOut() {
        window.gapi.auth2.getAuthInstance().signOut();
        console.log('just signed out?: ' + !window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }

    isSignedIn() {
        return window.gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    async listUpcomingEvents(cal_id, maxDisplayResults = null) {
        return await window.gapi.client.calendar.events.list({
            'calendarId': cal_id,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': maxDisplayResults,
            'orderBy': 'startTime'
        }).then(response => response.result.items, err => err.message);
    }

    async listCalendars() {
        return await window.gapi.client.calendar.calendarList.list().then(r => r.result.items, err => err.message);
    }

}