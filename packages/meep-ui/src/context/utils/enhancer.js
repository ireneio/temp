import React from 'react';

import * as contexts from '../context';
import getDisplayName from './getDisplayName';

export default (types, useRef) => Component => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    require('./checkTypes').default(types, Component);
  }

  const Root = types.reduce(
    (childFunc, typeName, index) => {
      const { Consumer: ContextConsumer } = contexts[
        `${typeName[0].toUpperCase()}${typeName.slice(1)}Context`
      ];
      const enhancedComponent = props => {
        /* istanbul ignore next */
        if (
          process.env.NODE_ENV !== 'production' &&
          index === types.length - 1
        ) {
          // eslint-disable-next-line global-require
          require('./checkTypes').checkProps(props, types, Component);
        }

        return (
          <ContextConsumer key={typeName}>
            {contextProps =>
              childFunc({
                ...props,
                ...contextProps,
              })
            }
          </ContextConsumer>
        );
      };

      enhancedComponent.displayName = getDisplayName(types, Component);

      return enhancedComponent;
    },
    useRef /* eslint-disable-next-line react/prop-types */
      ? ({ forwardedRef, ...props }) => (
          <Component {...props} ref={forwardedRef} />
        )
      : props => <Component {...props} />,
  );

  if (!useRef) return Root;

  return React.forwardRef((props, ref) => (
    <Root {...props} forwardedRef={ref} />
  ));
};
