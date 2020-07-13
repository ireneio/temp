// typescript import
import { Context } from 'react';
import { emptyFunction } from 'fbjs';

import { Subtract } from '@meepshop/utils/lib/types';

// import
import React, { useContext } from 'react';

// definition
export default <C extends object>(
  hocContext: Context<C>,
  mapProps = emptyFunction.thatReturnsArgument,
) => <P extends object>(
  Component: React.ComponentType<P> & {
    getInitialProps?: () => void;
  },
) => {
  const WithContext: React.FunctionComponent<Subtract<P, C>> & {
    getInitialProps?: () => void;
  } = (props: P) => (
    <Component {...props} {...mapProps(useContext(hocContext))} />
  );

  WithContext.getInitialProps = Component.getInitialProps;

  return WithContext;
};
