/* eslint-disable no-param-reassign */
import {
  AUTHENTICATE_GITHUB,
  GET_GITHUB_REPOS,
  TRACK_GITHUB_REPO,
  UNTRACK_GITHUB_REPO,
} from '../actions/github';

const initialState = {
  repos: [],
};

function mapRepo({ id, full_name }) {
  return {
    id,
    fullName: full_name,
  };
}

export default function github(state = initialState, action) {
  const { type, payload, error, meta } = action;

  switch (type) {
    case AUTHENTICATE_GITHUB:
      if (error) {
        return {
          ...state,
          error: true,
          twofa: !!payload.twofa,
          twofaFailed: !!state.twofa,
          tokenExists: !!payload.tokenExists,
        };
      }

      return {
        ...state,
        error: false,
        twofa: false,
        twofaFailed: false,
        tokenExists: false,
        accessToken: payload.token,
        scope: payload.scopes,
        username: meta.username,
      };

    case GET_GITHUB_REPOS: {
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

    case TRACK_GITHUB_REPO: {
      const repos = state.repos.map(repo => {
        if (repo.id === action.payload.id) {
          repo.tracked = true;
        }

        return repo;
      });

      return {
        ...state,
        repos,
      };
    }

    case UNTRACK_GITHUB_REPO: {
      const repos = state.repos.map(repo => {
        if (repo.id === action.payload.id) {
          repo.tracked = false;
        }

        return repo;
      });

      return {
        ...state,
        repos,
      };
    }

    default:
      return state;
  }
}
