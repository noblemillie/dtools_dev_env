/* eslint-disable no-param-reassign */
import {
  AUTHENTICATE_DATAWORLD,
  GET_DATAWORLD_REPOS,
  GET_DATAWORLD_DOWNLOAD,
  GET_DATAWORLD_DATASET,
} from '../actions/dataworld';

const initialState = {
  repos: [],
};

function mapRepo({ id, full_name }) {
  return {
    id,
    fullName: full_name,
  };
}

export default function dataworld(state = initialState, action) {
  const { type, payload, error, meta } = action;

  switch (type) {
    case AUTHENTICATE_DATAWORLD:
      if (error) {
        return {
          ...state,
          error: true,
          tokenExists: !!payload.tokenExists,
        };
      }

      return {
        ...state,
        error: false,
        tokenExists: false,
        accessToken: payload.token,
        scope: payload.scopes,
        username: meta.username,
      };

    case GET_DATAWORLD_REPOS: {
      if (error) return state;

      const repos = payload.map(repo => {
        const found = state.repos.reduce(
          (previous, current) => (repo.id === current.id ? current : previous),
          {}
        );

        return {
          // update if already existing
          ...found,
          ...mapRepo(repo),
        };
      });

      return {
        ...state,
        repos,
      };
    }

    // case UPLOAD_DATAWORLD_REPO: {
    //   const repos = state.repos.map(repo => {
    //     if (repo.id === action.payload.id) {
    //       repo.tracked = true;
    //     }
    //
    //     return repo;
    //   });
    //
    //   return {
    //     ...state,
    //     repos,
    //   };
    // }


    default:
      return state;
  }
}
