// typescript import
import { Context } from 'react';

import { Subtract } from '@meepshop/utils/lib/types';

// import
import React, { useContext } from 'react';
import { emptyFunction } from 'fbjs';

// definition
export default <C extends object, NP = C>(
  hocContext: Context<C>,
  mapProps: (argu: C) => NP = emptyFunction.thatReturnsArgument,
) => <P extends object>(
  Component: React.ComponentType<P> & {
    getInitialProps?: () => void;
  },
) => {
  const WithContext: React.FunctionComponent<Subtract<P, NP>> & {
    getInitialProps?: () => void;
  } = (props: P) => (
    <Component {...props} {...mapProps(useContext(hocContext))} />
  );

  WithContext.getInitialProps = Component.getInitialProps;

  return WithContext;
};
