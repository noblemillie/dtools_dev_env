/* eslint-disable no-param-reassign */
import { ADD_PROJECT, REMOVE_PROJECT } from '../actions/project';
import { START_JOB } from '../actions/job';
import { GET_DATAWORLD_DOWNLOAD } from '../actions/dataworld';
import getProjectIdentifiers from '../helpers/getProjectIdentifiers';

const initialState = {
  projects: [],
};

function downloadDataset(name, state, data = {}) {
  const found = state.projects.reduce(
    (previous, current) => (name === current.name ? true : previous),
    false
  );

  // don't insert duplicates
  if (found) return state;

  return {
    ...state,
    projects: [
      ...state.projects,
      {
        name,
        ...data,
      },
    ],
  };
}

// function uploadDataset(name, state, data = {}) {
//   const projects = state.projects.map(project => {
//     if (project.name === name) {
//       // only update lastActivity when more recent
//       if (data.lastActivityAt && data.lastActivityAt <= project.lastActivityAt) {
//         delete data.lastActivityAt;
//       }
//
//       return {
//         ...project,
//         name,
//         ...data,
//       };
//     }
//     return project;
//   });
//
//   return {
//     ...state,
//     projects,
//   };
// }
//
//
// export default function job(state = initialState, action) {
//   switch (action.type) {
//     case ADD_PROJECT: {
//       const { name } = action.payload;
//
//       return addProject(name, state);
//     }
//
//     case REMOVE_PROJECT: {
//       const projects = state.projects.filter(({ name }) => name !== action.payload);
//
//       return {
//         ...state,
//         projects,
//       };
//     }
//
//     case GET_DATAWORLD_DOWNLOAD: {
//       if (action.error) {
//         return {
//           ...state,
//           importError: true,
//         };
//       }
//
//       const issues = action.payload || [];
//       let newState = {
//         ...state,
//         importError: false,
//       };
//       // go through each body, finding "Tracks #..."
//       issues.forEach(issue => {
//         const identifiers = [
//           // for issues
//           ...getProjectIdentifiers(issue.body),
//           // for milestones
//           ...getProjectIdentifiers(issue.description),
//         ];
//         identifiers.forEach(identifier => {
//           newState = addProject(identifier, newState);
//         });
//       });
//
//       return newState;
//     }
//
//
//     case START_JOB:
//       return updateProject(action.payload.projectName, state, { lastActivityAt: new Date() });
//
//     default:
//       return state;
//   }
// }
