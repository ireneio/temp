// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon, Divider, Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Link from '@meepshop/link';

import useUnsubscribeEdm from './hooks/useUnsubscribeEdm';
import styles from './styles/index.less';

// graphql typescript
import { getStoreName } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const query = gql`
  query getStoreName {
    viewer {
      id
      store {
        id
        description {
          name
        }
      }
    }
  }
`;

const UnsubscribeEmail: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('unsubscribe-email');
  const { data } = useQuery<getStoreName>(query);
  const { loading } = useUnsubscribeEdm();
  const name = data?.viewer?.store?.description?.name;

  if (loading) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <div className={styles.root}>
      <div>
        <h1>
          {t('title')}
          <span>{name}</span>
        </h1>
        <p>{t('message.0')}</p>
        <Divider />
        <p>{t('message.1')}</p>

        <Link href="/">
          <Button size="large" type="primary">
            {t('back')}
          </Button>
        </Link>
      </div>
    </div>
  );
});

UnsubscribeEmail.getInitialProps = async () => ({
  namespacesRequired: ['unsubscribe-email'],
});

export default UnsubscribeEmail;
