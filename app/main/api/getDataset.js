import fetch from 'node-fetch';
import { status, json } from '../../shared/helpers/fetch';

export default function getDataset(accessToken) {
  return fetch(`https://api.data.world/v0/datasets/${owner}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(status)
  .then(json);
}
