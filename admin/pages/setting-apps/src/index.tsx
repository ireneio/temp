// typescript import
import { NextPage } from 'next';

// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';

import Item from './Item';
import useAppList from './hooks/useAppList';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const SettingApps: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('setting-apps');
  const appsList = useAppList();

  return (
    <Header
      title={t('title')}
      prevTitle={t('common:setting')}
      description={t('subTitle')}
      backTo="/setting"
      disableAffix
    >
      <div className={styles.root}>
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
