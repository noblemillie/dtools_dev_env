import fetchPaginated from '../../shared/helpers/fetchPaginated';
import { iterator, status, json, jsonAggregator } from '../../shared/helpers/fetch';

export default function getDatasets(accessToken, user, datasets) {
  return fetchPaginated(`https://api.data.world/v0/${user}/${datasets}/own`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(iterator(status))
  .then(iterator(json))
  .then(jsonAggregator);
}
