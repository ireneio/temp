// import
import React, { useEffect, useRef } from 'react';
import NProgress from 'nprogress';

import './styles/apolloNetworkStatus.less';
import { useApolloNetworkStatus } from './utils/initApollo';

// definition
export default React.memo(() => {
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

  return null;
});
