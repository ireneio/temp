// typescript import
import { NetworkStatus } from 'react-apollo-network-status';

// import
import React, { useEffect, useRef } from 'react';
import NProgress from 'nprogress';

import './styles/apolloNetworkStatus.less';
import { useApolloNetworkStatus } from './utils/initApollo';

// definition
const ApolloNetworkStatusContext = React.createContext<NetworkStatus>({
  numPendingQueries: 0,
  numPendingMutations: 0,
});

export const ApolloNetworkStatusProvider = React.memo(({ children }) => {
  const apolloNetworkStatus = useApolloNetworkStatus();
  const { numPendingQueries } = apolloNetworkStatus;
  const maxRef = useRef(0);
  const prevNumPendingQueries = useRef(0);

  useEffect(() => {
    if (numPendingQueries > 0) {
      if (prevNumPendingQueries.current < numPendingQueries)
        maxRef.current += 1;

      NProgress.configure({ showSpinner: false });
      NProgress.set((maxRef.current - numPendingQueries) / maxRef.current);
    } else {
      maxRef.current = 0;
      NProgress.done();
    }

    prevNumPendingQueries.current = numPendingQueries;
  }, [numPendingQueries]);

  return (
    <ApolloNetworkStatusContext.Provider value={apolloNetworkStatus}>
      {children}
    </ApolloNetworkStatusContext.Provider>
  );
});

export default ApolloNetworkStatusContext;
