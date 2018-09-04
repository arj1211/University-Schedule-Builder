from __future__ import print_function
from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import client
from oauth2client import file as oauth_file
from oauth2client import tools
import datetime
import googleapiclient

# If modifying these scopes, delete the file token.json.
SCOPES = 'https://www.googleapis.com/auth/calendar'

def get_service():
    store = oauth_file.Storage('token.json')
    creds = store.get()
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service = build('calendar', 'v3', http=creds.authorize(Http()))
    return service

def get_calendar_list_obj(service=get_service()):
    return service.calendarList().list().execute()

def get_calendar_list_items(calendar_list_obj=get_calendar_list_obj()):
    return calendar_list_obj['items']

def get_event_list_obj(calendar, service=get_service()):
    return service.events().list(calendarId=get_id(calendar)).execute()

def get_event_list_items(event_list_obj):
    return event_list_obj['items']

def get_name(obj):
    return obj['summary']

def get_id(obj):
    return obj['id']

def event_not_cancelled(event):
    return event['status']!='cancelled'

def event_not_all_day(event):
    try:
        event['start']['date']
        return False
    except KeyError:
        return True

def get_event_time(event):
    if event_not_all_day(event):
        
        ''' event = { ... 
        "start": {
            "dateTime": "2018-06-02T15:00:00-04:00"
        }
        '''
        start_datetime=event['start']['dateTime'].split('T')
        start_date=start_datetime[0].split('-')
        start_time=start_datetime[1].split('-')
        
        end_datetime=event['end']['dateTime'].split('T')
        end_date=end_datetime[0].split('-')
        end_time=end_datetime[1].split('-')
        
        return {
            'startDate':start_date,
            'startTime':
            {
                'time':start_time[0],
                'timeZone':start_time[1]
            },
            'endDate':end_date,
            'endTime':
            {
                'time':end_time[0],
                'timeZone':end_time[1]
            }
        }

    else:
        ''' event = { ... 
        "start": {
            "date": "2019-02-14"
        }
        '''
        start_date=event['start']['date'].split('-')
        end_date=event['end']['date'].split('-')
        return {
            'startDate':start_date,
            'endDate':end_date
        }

def create_event(summary, description, start, end):
    event = {
        'summary': summary,
        'description': description,
        'start': start,
        'end': end
    }
    return event

def publish_event(calendar_id, event, service=get_service()):
    try: 
        event = service.events().insert(calendarId=calendar_id, body=event).execute()
        # print 'Event created: %s' % (event.get('htmlLink'))
        return event.get('htmlLink')
    except googleapiclient.errors.HttpError:
        return -1

for cal in get_calendar_list_items():
    print(get_name(cal), get_id(cal))
    el = get_event_list_items(get_event_list_obj(cal))
    for e in el:
        if event_not_cancelled(e):# and event_not_all_day(e):
            print('\t',get_name(e), get_id(e))
            print('\t\t',get_event_time(e)['startDate'],get_event_time(e)['endDate'])
            if event_not_all_day(e): print('\t\t',get_event_time(e)['startTime']['time'],get_event_time(e)['endTime']['time'])

print(publish_event('en-gb.canadian#holiday@group.v.calendar.google.com',create_event('test event 1', 'this is a test event for primary calendar', {'dateTime':'2018-09-04T15:00:00-04:00'},{'dateTime':'2018-09-04T16:00:00-04:00'})))