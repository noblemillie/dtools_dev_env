import fetchPaginated from '../../shared/helpers/fetchPaginated';
import { iterator, status, json, jsonAggregator } from '../../shared/helpers/fetch';

export default function getRepos(accessToken, user) {
  return fetchPaginated('https://api.data.world/v0/${user}/datasets/own?sort=updated', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(iterator(status))
  .then(iterator(json))
  .then(jsonAggregator);
}
