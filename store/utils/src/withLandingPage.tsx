// import
import React, { useContext } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import getConfig from 'next/config';

import { Role as RoleContext } from '@meepshop/context';
import { RoleProvider } from '@meepshop/context/lib/Role';

// definition
const {
  publicRuntimeConfig: { VERSION },
} = getConfig();

export default (
  Component: React.ComponentType<{}> & {
    getInitialProps?: () => void;
  },
): React.ReactNode => {
  const LandingPage: React.FunctionComponent<{}> & {
    getInitialProps?: () => void;
  } = React.memo(props => {
    const role = useContext(RoleContext);

    if (role === 'SHOPPER') return <Component {...props} />;

    const firstPurchaseClient = new ApolloClient({
      name: 'landing-page',
      version: VERSION,
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: '/api/landing-page/graphql',
        credentials: 'include',
      }),
    });

    return (
      <ApolloProvider client={firstPurchaseClient}>
        <RoleProvider>
          <Component {...props} />
        </RoleProvider>
      </ApolloProvider>
    );
  });

  LandingPage.getInitialProps = Component.getInitialProps;

  return LandingPage;
};
