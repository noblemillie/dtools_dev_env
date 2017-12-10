import fetchPaginated from '../../shared/helpers/fetchPaginated';
import { iterator, status, json, jsonAggregator } from '../../shared/helpers/fetch';

export default function getMilestones(accessToken, repoFullName) {
  return fetchPaginated(`https://api.github.com/repos/${repoFullName}/milestones?state=all`, {
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
  .then(iterator(status))
  .then(iterator(json))
  .then(jsonAggregator);
}
