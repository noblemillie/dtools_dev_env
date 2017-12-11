import fetchPaginated from '../../shared/helpers/fetchPaginated';
import { iterator, status, json, jsonAggregator } from '../../shared/helpers/fetch';

export default function getMilestones(accessToken, owner, id, file) {
  return fetchPaginated(`https://api.data.world/v0/file_download/${owner}/${id}/${file}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(iterator(status))
  .then(iterator(json))
  .then(jsonAggregator);
}
