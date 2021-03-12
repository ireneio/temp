// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon, Divider, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link, { useRouter } from '@meepshop/link';

import useUnsubscribe from './hooks/useUnsubscribe';
import styles from './styles/index.less';

// graphql typescript
import { getStoreName as getStoreNameType } from '@meepshop/types/gqls/store';

// graphql import
import { getStoreName } from './gqls';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const UnsubscribeEmail: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('unsubscribe-email');
  const { query } = useRouter();
  const { data } = useQuery<getStoreNameType>(getStoreName);
  const { loading } = useUnsubscribe();
  const name = data?.viewer?.store?.description?.name;

  if (loading) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <div className={styles.root}>
      <div>
        <h1>
          {t('title')}
          <span>{name}</span>
          {query?.from !== 'reward-point-reminder'
            ? null
            : t('reward-point-reminder.title')}
        </h1>
        <p>{t(`${query?.from}.0`)}</p>
        <Divider />
        <p>{t(`${query?.from}.1`)}</p>

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
