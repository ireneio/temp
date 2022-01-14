// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Divider, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';

import useUnsubscribe from './hooks/useUnsubscribe';
import styles from './styles/index.less';

// graphql typescript
import { getStoreName as getStoreNameType } from '@meepshop/types/gqls/store';

// graphql import
import { getStoreName } from './gqls';

// typescript definition
interface PropsType {
  userId: string;
  type: string;
  namespacesRequired: string[];
}

// definition
const UnsubscribeEmail: NextPage<PropsType> = React.memo(({ userId, type }) => {
  const { t } = useTranslation('unsubscribe-email');
  const { data } = useQuery<getStoreNameType>(getStoreName);
  const { loading } = useUnsubscribe(userId, type);
  const name = data?.viewer?.store?.description?.name;

  if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <div className={styles.root}>
      <div>
        <h1>
          {t('title')}
          <span>{name}</span>
          {type !== 'reward-point-reminder'
            ? null
            : t('reward-point-reminder.title')}
        </h1>
        <p>{t(`${type}.0`)}</p>
        <Divider />
        <p>{t(`${type}.1`)}</p>

        <Link href="/">
          <Button size="large" type="primary">
            {t('back')}
          </Button>
        </Link>
      </div>
    </div>
  );
});

UnsubscribeEmail.getInitialProps = async ({ query: { userId, type } }) => {
  // FIXME: should use get getServerSideProps return notFound
  if (typeof userId !== 'string' || typeof type !== 'string')
    throw new Error('[FIXME] type/userId is undefined');

  return {
    userId,
    type,
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  };
};

export default UnsubscribeEmail;
