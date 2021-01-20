// typescript import
import { Subtract } from '@meepshop/types';

// import
import React from 'react';

// definition
export default <Props extends {}, HooksProps>(
  hook: (props: Props) => HooksProps,
) => (
  Component: React.ComponentType<Props & HooksProps> & {
    getInitialProps?: () => void;
  },
) => {
  const WithHook: React.FunctionComponent<Subtract<Props, HooksProps>> & {
    getInitialProps?: () => void;
  } = (props: Props) => <Component {...props} {...hook(props)} />;

  WithHook.getInitialProps = Component.getInitialProps;

  return WithHook;
};
