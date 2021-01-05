// typescript import
import { Context } from 'react';

import { Subtract } from '@meepshop/utils/lib/types';

// import
import React, { useContext } from 'react';
import { emptyFunction } from 'fbjs';

// definition
export default <C, ContextProps = C>(
  hocContext: Context<C>,
  mapProps: (argu: C) => ContextProps = emptyFunction.thatReturnsArgument,
) => <Props extends {}>(
  Component: React.ComponentType<Props & ContextProps> & {
    getInitialProps?: () => void;
  },
) => {
  const WithContext: React.FunctionComponent<Subtract<Props, ContextProps>> & {
    getInitialProps?: () => void;
  } = (props: Props) => (
    <Component {...props} {...mapProps(useContext(hocContext))} />
  );

  WithContext.getInitialProps = Component.getInitialProps;

  return WithContext;
};
