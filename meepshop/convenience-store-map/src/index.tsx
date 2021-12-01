// typescript import
import { ConvenienceStorePropsType } from './constants';

// import
import React from 'react';
import { Tabs } from 'antd';

import { useTranslation } from '@meepshop/locales';

import StoreAddress from './StoreAddress';
import StoreName from './StoreName';
import StoreNumber from './StoreNumber';
import styles from './styles/index.less';

// definition
const { TabPane } = Tabs;

export { ConvenienceStorePropsType };

export default React.memo((props: ConvenienceStorePropsType) => {
  const { t } = useTranslation('convenience-store-map');

  return (
    <Tabs
      className={styles.root}
      size="small"
      defaultActiveKey="address"
      destroyInactiveTabPane
      animated
    >
      <TabPane tab={t('addressSearch')} key="address">
        <StoreAddress {...props} />
      </TabPane>
      <TabPane tab={t('nameSearch')} key="name">
        <StoreName {...props} />
      </TabPane>
      <TabPane tab={t('storeNumberSearch')} key="storeNumber">
        <StoreNumber {...props} />
      </TabPane>
    </Tabs>
  );
});
