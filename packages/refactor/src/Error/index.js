// import
import React from 'react';
import { useApolloClient } from '@apollo/client';

import { log } from '@meepshop/logger/lib/gqls/log';
import PageError from '@meepshop/page-error';

import ErrorPageNotFound from './ErrorPageNotFound';

// definition
// eslint-disable-next-line react/prop-types
export default ({ error }) => {
  const client = useApolloClient();
  const { status } = error;

  if (['ERROR_PAGE_NOT_FOUND', 'ERROR_PRODUCT_NOT_FOUND'].includes(status))
    client.mutate({
      mutation: log,
      variables: {
        input: {
          type: 'WARN',
          name: 'NOT_FOUND',
          data: error,
        },
      },
    });

  if (status === 'ERROR_PAGE_NOT_FOUND') return <ErrorPageNotFound />;
  if (status === 'ERROR_PRODUCT_NOT_FOUND') return <ErrorPageNotFound />;
  if (status === 'API_ERROR')
    return <PageError error={{ ...error, networkError: {} }} />;

  return <PageError error={error} />;
};
