/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import config from '../../../../config';
import RepositoryList from './RepositoryList';
import DataworldAuth from './DataworldAuth';

// TODO: link to unlink account (remove token via API + delete from state)
function Dataworld({
  requestAuthenticateDataworld,
  requestGetDataworldRepos,
  trackDataworldRepo,
  untrackDataworldRepo,
  requestImportDataworldProjects,
  dataworld,
  project,
}) {
  const grantedScopes = new Set(dataworld.scope);
  const requiredScopes = config.dataworld.scopes;
  const diff = requiredScopes.filter(item => !grantedScopes.has(item));

  const authRequired = !dataworld.accessToken;
  const additionalScopesRequired = !!diff.length;

  return (
    <Grid>
      <Cell col={12}>
        <h1>Dataworld</h1>

        {authRequired &&
          <DataworldAuth
            onSubmit={({ username, password, twofa }) => requestAuthenticateDataworld(username, password, twofa)}
            dataworld={dataworld}
          />
        }

        {additionalScopesRequired && <div>Give me more permissions</div>}

        {!authRequired && !additionalScopesRequired &&
          <div>
            <RepositoryList
              requestGetDataworldRepos={requestGetDataworldRepos}
              trackDataworldRepo={trackDataworldRepo}
              dataworld={dataworld}
            />
          </div>
        }
      </Cell>
    </Grid>
  );
}

Dataworld.propTypes = {
  requestAuthenticateDataworld: PropTypes.func.isRequired,
  requestGetDataworldRepos: PropTypes.func.isRequired,
  requestImportDataworldProjects: PropTypes.func.isRequired,
  dataworld: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

export default Dataworld;
