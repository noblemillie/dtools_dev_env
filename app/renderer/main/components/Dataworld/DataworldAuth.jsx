/* eslint-disable no-param-reassign */
import React, { PropTypes } from 'react';
import { Button } from 'react-mdl';
import { reduxForm, Field } from 'redux-form';
import adapter, { TEXT, PASSWORD } from '../../../shared/forms/adapter';

function DataworldAuth({ handleSubmit, dataworld }) {
  function onSubmit(...args) {
    handleSubmit(...args);
  }

  const errors = {};
  if (dataworld.error) {
    if (dataworld.twofaFailed) {
      errors.twofa = 'Incorrect two factor auth code';
    } else if (dataworld.tokenExists) {
      errors.username = 'Token already exists';
    } else {
      errors.username = 'There has been a problem logging you in';
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Field name="username" label="Username" error={errors.username} component={TEXT} />
        <Field name="password" label="Password" error={errors.password} component={PASSWORD} />
        <Button type="submit" raised accent ripple>Login</Button>
      </form>
      {dataworld.tokenExists &&
        <div>
          <a href="https://data.world/settings/tokens">
            Please make sure you don't already have an existing Personal access token
          </a>
        </div>
      }
    </div>
  );
}

DataworldAuth.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dataworld: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'dataworldAuth',
  adapter,
})(DataworldAuth);
