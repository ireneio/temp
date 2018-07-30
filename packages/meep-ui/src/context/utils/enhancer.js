import React from 'react';

import * as contexts from '../context';
import getDisplayName from './getDisplayName';

export default types => Component => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    require('./checkTypes').default(types, Component);
  }

  const Root = types.reduce(
    (childFunc, typeName) => {
      const { Consumer: ContextConsumer } = contexts[
        `${typeName[0].toUpperCase()}${typeName.slice(1)}Context`
      ];
      const enhancedComponent = props => (
        <ContextConsumer key={typeName}>
          {contextProps =>
            childFunc({
              ...props,
              ...contextProps,
            })
          }
        </ContextConsumer>
      );

      enhancedComponent.displayName = getDisplayName(types, Component);

      return enhancedComponent;
    },
    ({ forwardedRef, ...props }) => <Component {...props} ref={forwardedRef} />,
  );

  return React.forwardRef((props, ref) => (
    <Root {...props} forwardedRef={ref} />
  ));
};
