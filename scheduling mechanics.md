# Rules for scheduling:

1. Need earliest start time (ie. 7am) and latest end time (ie. 11pm) for each day. So 
nothing can be scheduled before the earliest start time or after the latest end time

2. IF NO START DATE SPECIFIED: start scheduling a minimum of 2 hours after NOW (ie. don't schedule anything 
before 2 hours after 'find free time to use' function is called)

3. 'assignment' that is due earliest and has the highest weight needs to be scheduled 
first; program cant handle re-scheduling

4. IF NOT STARTING SCHEDULING TODAY, AND ANOTHER START DATE IS SPECIFIED: just follow rules 
starting from 12am that day

5. dont have more than 2 consecutive 1-hour 'working-period' blocks in any day. if 
something has been worked on for 2 hours straight, have a minumum of 1 hour break in 
between OR stop scheduling for that particular 'assignment' on that day

## Finding free time mechanic:

1. need start date and end date; start 'counting' 12am on start date, and stop on 12am of end date

2. starting at earliest_start_time (7am), count by 15min increments through the whole day till ...

3. find all events from all of selected calendars c1, c2, ...

4. only concerned with events with dateTime (not full day events)

5. for date 'n' (with year month and day values), find all events with 
matching date in their startDate fields

