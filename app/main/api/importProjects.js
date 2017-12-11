import { jsonAggregator } from '../../shared/helpers/fetch';
import getDataset from './getDataset';
import getDatasets from './getDatasets';

export default function importProjects(accessToken, repoFullName) {
  return Promise.all([
    getIssues(accessToken, repoFullName),
    getMilestones(accessToken, repoFullName),
  ])
  .then(jsonAggregator);
}
