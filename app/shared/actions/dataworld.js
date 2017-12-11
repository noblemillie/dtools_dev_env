import { ALIASED } from '.';
import dataworldAuth from '../../main/api/requestDataworldToken';
import getRepos from '../../main/api/getRepos';
import importProjects from '../../main/api/importProjects';
import getIssuesForUser from '../../main/api/getIssuesForUser';

export const aliases = {};

// Authenticate
export const AUTHENTICATE_DATAWORLD = 'AUTHENTICATE_DATAWORLD';

export function requestAuthenticateDataworld(options) {
  return {
    type: ALIASED,
    payload: [options],
    meta: {
      trigger: AUTHENTICATE_DATAWORLD,
    },
  };
}
export function authenticateDataworld(options) {
  return {
    type: AUTHENTICATE_DATAWORLD,
    payload: dataworldAuth(options),
    meta: {
      username,
    },
  };
}
aliases[AUTHENTICATE_DATAWORLD] = authenticateDataworld;


// Get repos
export const GET_DATAWORLD_REPOS = 'GET_DATAWORLD_REPOS';
export const GET_DATAWORLD_DATASET = 'GET_DATAWORLD_DATASET';
export const GET_DATAWORLD_PROJECT = 'GET_DATAWORLD_PROJECT';

export function requestGetDataworldRepos(accessToken) {
  return {
    type: ALIASED,
    payload: [accessToken],
    meta: {
      trigger: GET_DATAWORLD_REPOS,
    },
  };
}
export function getDataworldRepos(accessToken) {
  return {
    type: GET_DATAWORLD_REPOS,
    payload: getRepos(accessToken),
  };
}
aliases[GET_DATAWORLD_REPOS] = getDataworldRepos;



export function getDataworldProject(id) {
  return {
    type: GET_DATAWORLD_PROJECT,
    payload: {
      id,
    },
  };
}
export function getDataworldDataset(id) {
  return {
    type: GET_DATAWORLD_DATASET,
    payload: {
      id,
    },
  };
}

// Download datasets
export const GET_DATAWORLD_DOWNLOAD = 'GET_DATAWORLD_DOWNLOAD';

export function requestDataworldDownload(accessToken, repoFullName) {
  return {
    type: ALIASED,
    payload: [accessToken, repoFullName],
    meta: {
      trigger: GET_DATAWORLD_DOWNLOAD,
    },
  };
}
export function getDataworldDownload(accessToken, repoFullName) {
  return {
    type: GET_DATAWORLD_DOWNLOAD,
    payload: getFileDownload(accessToken, repoFullName),
  };
}
aliases[GET_DATAWORLD_DOWNLOAD] = getDataworldDownload;


// Get datasets assigned to a project repository
// export const GET_DATAWORLD_DATASET_ASSIGNED_TO_PROJECT = 'GET_DATAWORLD_DATASET_ASSIGNED_TO_PROJECT';
//
// export function getDataworldDatasetAssignedToProject(accessToken) {
//   return {
//     type: GET_DATAWORLD_DATASET_ASSIGNED_TO_PROJECT,
//     payload: getDatasetsForProject(accessToken),
//   };
// }
