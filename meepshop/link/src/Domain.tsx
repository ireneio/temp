// typescript import
import { AppContext, AppProps } from 'next/app';
import { NextPageContext } from 'next';

import { NextAppType } from '@meepshop/types';

// import
import React from 'react';

import useRouteChange from './hooks/useRouteChange';

// typescript definition
interface PropsType {
  domain: string | null;
  serverRouter: AppContext['router'] | null;
}

// definition
const DomainContext = React.createContext<PropsType & { previousUrl: string }>({
  domain: null,
  serverRouter: null,
  previousUrl: '/',
});

export const appWithDomain = (App: NextAppType): NextAppType => {
  const Component = ({
    domain,
    serverRouter,
    ...props
  }: PropsType & AppProps): React.ReactElement => {
    const previousUrl = useRouteChange();

    return (
      <DomainContext.Provider
        value={{
          previousUrl,
          domain,
          serverRouter,
        }}
      >
        <App {...props} />
      </DomainContext.Provider>
    );
  };

  Component.getInitialProps = App.getInitialProps;

  return Component;
};

export const getServerSideDomainContextProps = (
  ctx: NextPageContext,
  router: AppContext['router'],
): PropsType => ({
  domain: ctx.req?.headers.host || null,
  serverRouter: router,
});

export const getClientSideDomainContextProps = (): PropsType => ({
  domain: window.location.host,
  serverRouter: null,
});

export default DomainContext;
