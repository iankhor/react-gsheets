// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_API_CLIENTID

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]

// Authorization scopes required by the API multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly"

const sheetsAPI = window.gapi

let isAuth = null

/**
 *  On load, called to load the auth2 library and API client library.
 */
export function handleClientLoad(callback) {
  sheetsAPI.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
export function initClient() {
  sheetsAPI.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    sheetsAPI.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(sheetsAPI.auth2.getAuthInstance().isSignedIn.get());
  });
}



/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
export function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    // place holder for action
    console.log('user is signed in')
    isAuth = true
  } else {
    console.log('user is signed out')
    isAuth = false
  }
}

export function isAuthenticated() {
  console.log('isAuth: ' , isAuth)
  // return isAuth
}


/**
 *  Sign in the user upon button click.
 */
export function handleAuthClick(event) {
  sheetsAPI.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
export function handleSignoutClick(event) {
  sheetsAPI.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
export function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
