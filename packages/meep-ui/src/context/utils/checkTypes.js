import PropTypes from 'prop-types';
import { invariant } from 'fbjs';

import * as contexts from '../context';
import getDisplayName from './getDisplayName';

const contextNames = Object.keys(contexts).map(name => {
  const contextName = name.replace(/Context/, '');

  return contextName[0].toLowerCase() + contextName.slice(1);
});

export default (types, Component) => {
  invariant(types.length !== 0, 'Must give enhacer types.');

  PropTypes.checkPropTypes(
    {
      types: PropTypes.arrayOf(PropTypes.oneOf(contextNames)).isRequired,
    },
    { types },
    'types',
    getDisplayName(types, Component),
  );
};
