// typescript import
import { Context } from 'react';

// import
import React, { useContext } from 'react';

// definition
export default <C extends object>(hocContext: Context<C>) => <P extends object>(
  Component: React.ComponentType<P> & {
    getInitialProps: () => void;
  },
): React.ReactNode => {
  const WithContext = (props: P): React.ReactNode => (
    <Component {...props} {...useContext(hocContext)} />
  );

  WithContext.getInitialProps = Component.getInitialProps;

  return WithContext;
};
