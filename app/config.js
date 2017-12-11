import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  silent: true,
  path: path.resolve(__dirname, '../.env'),
});

const config = {
  github: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.DATAWORLD_SECRET,
    // Scopes limit access for OAuth tokens.
    // scopes: [],
  },
};


// ====================electron OAuth==========================

// Your dataworld Applications Credentials
var options = {
    client_id: process.env.CLIENT_ID,
    redirect_uri : "http://localhost/oauth/code_callback",
    response_type : "code",
    state : "",
    code_challenge_method = "plain",
    // client_secret: 'your_client_secret',
    code_challenge : "",
};

// Build the OAuth consent page URL
var authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
var dataworldUrl = 'https://data.world/oauth/authorize?';
var authUrl = dataworldUrl + 'client_id=' + options.client_id + '&redirect_uri=' + options.redirect_uri + '&response_type' + options.code;

authWindow.loadURL(authUrl);
authWindow.show();

function handleCallback (url) {
  var raw_code = /code=([^&]*)/.exec(url) || null;
  var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
  var error = /\?error=(.+)$/.exec(url);

  if (code || error) {
    // Close the browser if code found or error
    authWindow.destroy();
  }

  // If there is a code, proceed to get token from github
  if (code) {
    self.requestDataworldToken(options, code);
  } else if (error) {
    alert('Oops! Something went wrong and we couldn\'t' +
      'log you in using data.world. Please try again.');
  }
}

// Handle the response from dataworld
authWindow.webContents.on('will-navigate', function (event, url) {
  handleCallback(url);
});

authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
  handleCallback(newUrl);
});

// Reset the authWindow on close
authWindow.on('close', function() {
    authWindow = null;
}, false);



// ====================electron OAuth==========================




export default config;





// const config = {
//   client_id: process.env.CLIENT_ID,
//   redirect_uri:('http://localhost:8080'),
//   response_type: 'code',
//   code_verifier: 'NTM3MDAyOTk0OGEwMjZmOWE0YTA5MGM3MDVjZGFiOWYyOTVmZGQ3ZmY0OTA2OTVlMTQ3MjFiZWIwN2E1Y2E3YQ',
//   code_challenge: base64(sha256('NTM3MDAyOTk0OGEwMjZmOWE0YTA5MGM3MDVjZGFiOWYyOTVmZGQ3ZmY0OTA2OTVlMTQ3MjFiZWIwN2E1Y2E3YQ'))
// }
