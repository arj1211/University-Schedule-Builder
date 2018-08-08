from __future__ import print_function
from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import client
from oauth2client import file as oauth_file
from oauth2client import tools
import datetime

# If modifying these scopes, delete the file token.json.
SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

def get_service():
    store = oauth_file.Storage('token.json')
    creds = store.get()
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service = build('calendar', 'v3', http=creds.authorize(Http()))
    return service

def get_calendar_list_obj(service):
    return service.calendarList().list().execute()

def get_calendar_list_items(calendar_list_obj):
    return calendar_list_obj['items']

def get_event_list_obj(service, calendar):
    return service.events().list(calendarId=get_id(calendar)).execute()

def get_event_list_items(event_list_obj):
    return event_list_obj['items']

def get_name(obj):
    return obj['summary']

def get_id(obj):
    return obj['id']

# calenderlist['items'][n]['summary'] is nth calender's name

service=get_service()
calender_list_obj=get_calendar_list_obj(service)
for cal in get_calendar_list_items(calender_list_obj):
    print(get_name(cal), get_id(cal)) #works
    


