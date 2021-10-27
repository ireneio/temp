// typescript import
import { apolloErrorType } from './utils/errorLink';

// import
import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import Head from 'next/head';

import { useTranslation } from '@meepshop/locales';
import {
  pageErrorStars,
  pageErrorSmoke,
  pageErrorShip,
} from '@meepshop/images';

import Redirect from './Redirect';
import StoreNotExists from './StoreNotExists';
import styles from './styles/pageError.less';

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
}

// definition
export default React.memo(({ error }: PropsType) => {
  const { t } = useTranslation('apollo');
  const client = useApolloClient();

  if (error.networkError?.statusCode !== 401)
    client.mutate<logType, logVariables>({
      mutation: log,
      variables: {
        input: {
          type: (error.networkError?.statusCode === 403
            ? 'WARN'
            : 'ERROR') as LogTypeEnum,
          name: 'PAGE_ERROR' as LogNameEnum,
          data: error,
        },
      },
    });

  switch (error.networkError?.statusCode) {
    case 401:
      return <Redirect />;

    case 403:
      return <StoreNotExists />;

    default: {
      const type = !error.networkError ? 'server' : 'network';

      return (
        <>
          <Head>
            <title>{type} error</title>
          </Head>

          <div className={styles.root}>
            <div className={styles.image}>
              <img src={pageErrorStars} alt="stars" />
              <img src={pageErrorSmoke} alt="smoke" />
              <img src={pageErrorShip} alt="ship" />
            </div>

            <div className={styles.message}>
              <h1>{t(`${type}-error.title`)}</h1>
              <p>{t(`${type}-error.message`)}</p>
              <p>
                {
                  {
                    server: 'Oops! Something went wrong.',
                    network: 'Please try again in a few minutes.',
                  }[type]
                }
              </p>
            </div>
          </div>
        </>
      );
    }
  }
});
