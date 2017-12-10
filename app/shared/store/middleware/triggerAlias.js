/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import assert from 'assert';
import { ALIASED } from '../../actions';
import { aliases as githubAliases } from '../../actions/github';

const aliases = {
  ...githubAliases,
};

const triggerAlias = store => next => action => {
  // TODO: store.dispatch() instead to not skip any middleware
  if (action.type === ALIASED) {
    assert(action.meta && action.meta.trigger, 'No trigger defined');
    assert(aliases[action.meta.trigger], `Trigger alias ${action.meta.trigger} not found`);
    const args = action.payload || [];

    // trigger alias
    action = aliases[action.meta.trigger](...args);
  }

  return next(action);
};

export default triggerAlias;
