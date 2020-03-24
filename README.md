## Todo
- [x] Get `listUpcomingEvents` working
- [ ] Merge branch to master
- [ ] Make a CalendarCard component that has name of calendar + 3 immediately upcoming events
- [ ] Add MaterialUI

## Auth
- Create `creds.js` in `src` folder
- `creds.js` :
  ```javascript
    var creds = {
        CLIENT_ID : "<Your Client ID here>",
        API_KEY : "<Your API Key here>",
        cal_id : '<ID of one of your google calendars>'
        // cal_id = 'primary' if you want to see events for your default calendar
    };
    export {creds};
  ```
- Can get `CLIENT_ID` and `API_KEY` from [google dev console](https://console.cloud.google.com)
  - Create a new project, take note of its **ID**
  - Go to https://console.cloud.google.com/apis/library?project=Your_project's_ID_here
    - Search for ***Google Calendar API*** and enable it for your project
  - Go to https://console.cloud.google.com/apis/credentials?project=Your_project's_ID_here
  - Create credentials
    1. API key
       - copy the key, put it in the `creds.js` file
    2. OAuth client ID
       1. Application type: Web
       2. Authorised JavaScript origins: [http://localhost:3000](http://localhost:3000)
       3. Authorised redirect URIs: [http://localhost:3000](http://localhost:3000)
       4. Create
       5. copy the **client_id**, put it in the `creds.js` file

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
