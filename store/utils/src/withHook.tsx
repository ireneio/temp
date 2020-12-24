// typescript import
import { Subtract } from '@meepshop/utils/lib/types';

// import
import React from 'react';

// definition
export default <P extends object, NP = P>(hook: (props: P) => NP) => (
  Component: React.ComponentType<NP> & {
    getInitialProps?: () => void;
  },
) => {
  const WithHook: React.FunctionComponent<Subtract<P, NP>> & {
    getInitialProps?: () => void;
  } = (props: P) => <Component {...props} {...hook(props)} />;

  WithHook.getInitialProps = Component.getInitialProps;

  return WithHook;
};
