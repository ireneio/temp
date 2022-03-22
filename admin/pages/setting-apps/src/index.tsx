// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';

import Affiliate from './Affiliate';
import Item from './Item';
import useAppList from './hooks/useAppList';
import styles from './styles/index.less';

// graphql typescript
import { getFeatureSubscriptions as getFeatureSubscriptionsType } from '@meepshop/types/gqls/admin';

// graphql import
import { getFeatureSubscriptions } from './gqls';
import { affiliateFragment } from './gqls/affiliate';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const SettingApps: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('setting-apps');
  const { data } = useQuery<getFeatureSubscriptionsType>(
    getFeatureSubscriptions,
  );
  const appsList = useAppList();
  const store = data?.viewer?.store || null;

  return (
    <Header
      title={t('title')}
      prevTitle={t('common:setting')}
      backTo="/setting"
      disableAffix
    >
      {!store?.isAffilaiteEnabled ? null : (
        <div className={styles.root}>
          <div className={styles.title}>{t('subscription.title')}</div>

          <div className={styles.subTitle}>{t('subscription.subTitle')}</div>

          <Affiliate store={filter(affiliateFragment, store)} />
        </div>
      )}

      <div className={styles.root}>
        <div className={styles.title}>{t('basic.title')}</div>

        <div className={styles.subTitle}>{t('basic.subTitle')}</div>

        {appsList.map(app => (
          <Item key={app.title} {...app} />
        ))}
      </div>
    </Header>
  );
});

SettingApps.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SettingApps;
