import fetch from 'node-fetch';
import config from '../../config';
import { status, json } from '../../shared/helpers/fetch';

// requestDataworldToken: function (options, code) {
//
//   apiRequests
//     .post('https://data.world/oauth/authorize', {
//       client_id: options.client_id,
//       client_secret: options.client_secret,
//       code: code,
//     })
//     .end(function (err, response) {
//       if (response && response.ok) {
//         // Success - Received Token.
//         // Store it in localStorage maybe?
//         window.localStorage.setItem('dw_api_token', response.body.access_token);
//       } else {
//         // Error - Show messages.
//         console.log(err);
//       }
//     });
//
// }
//
//
//
//







export default function requestDataworldToken(options, code) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      scopes: config.dataworld.scopes,
      note: 'dataset.tools App',
    }),
  };

  return fetch('https://api.data.world/authorizations', options)
  .then(status)
  .then(json);
}
