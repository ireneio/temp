import PropTypes from 'prop-types';
import { invariant, warning } from 'fbjs';

import * as contexts from '../context';
import { contextPropsKey } from './contextProvider';
import getDisplayName from './getDisplayName';

const contextNames = Object.keys(contexts).map(name => {
  const contextName = name.replace(/Context/, '');

  return contextName[0].toLowerCase() + contextName.slice(1);
});

export const checkProps = (prevProps, types, Component) => {
  Object.keys(contextPropsKey).forEach(type =>
    contextPropsKey[type].forEach(typeName => {
      warning(
        prevProps[typeName] === undefined,
        `\`${typeName}\` is in the props of \`${getDisplayName(
          types,
          Component,
        )}\`. Use \`removeContextProps(props)\` if using \`...props\` in the parent Component. If this is not the \`${typeName}\` in the \`context props\`, rename it.`,
      );
    }),
  );
};

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
