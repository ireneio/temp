// typescript import
import { apolloErrorType } from '@meepshop/apollo/lib/utils/errorLink';

// import
import React from 'react';
import { useApolloClient } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

import Error from './Error';
import Redirect from './Redirect';

// graphql typescript
import {
  log as logType,
  logVariables,
  LogTypeEnum,
  LogNameEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { log } from '@meepshop/logger/lib/gqls/log';

// typescript definition
interface PropsType {
  error: apolloErrorType;
  loggerInfoId: string;
}

// definition
export default React.memo(({ error, loggerInfoId }: PropsType) => {
  const { t } = useTranslation('apollo');
  const client = useApolloClient();

  if (error.networkError?.statusCode !== 401)
    client.mutate<logType, logVariables>({
      mutation: log,
      variables: {
        input: {
          // FIXME: remove [FIXME] after using getServerSideProps
          type: (error.networkError?.statusCode === 403 ||
          /\[FIXME]/.test(error.message)
            ? 'WARN'
            : 'ERROR') as LogTypeEnum,
          name: 'PAGE_ERROR' as LogNameEnum,
          data: {
            message: error.message,
            stack: error.stack,
            networkError: error.networkError,
            graphQLErrors: error.graphQLErrors,
          },
        },
      },
    });

  switch (error.networkError?.statusCode) {
    case 401:
      return <Redirect />;

    case 403:
      return (
        <Error title="The store does not exist" loggerInfoId={loggerInfoId}>
          <>
            <h1>
              <span>{t('store.title.1')}</span>
              <span>{t('store.title.2')}</span>
            </h1>
            <p>{t('store.message')}</p>
          </>
        </Error>
      );

    default: {
      const type = !error.networkError ? 'server' : 'network';

      return (
        <Error title={`${type} error`} loggerInfoId={loggerInfoId}>
          <>
            <h1>{t(`${type}-error.title`)}</h1>
            <p>{t(`${type}-error.message`)}</p>
            {type !== 'network' ? null : (
              <p>Please try again in a few minutes.</p>
            )}
          </>
        </Error>
      );
    }
  }
});
