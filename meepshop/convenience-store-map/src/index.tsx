// typescript import
import { ConvenienctStorePropsType } from './constants';

// import
import React from 'react';
import { Modal, Tabs } from 'antd';

import { useTranslation } from '@meepshop/locales';

import StoreAddress from './StoreAddress';
import StoreName from './StoreName';
import StoreNumber from './StoreNumber';
import styles from './styles/index.less';

// typescript definition
interface PropsType extends ConvenienctStorePropsType {
  close: () => void;
}

// definition
const { TabPane } = Tabs;

export default React.memo(({ close, ...props }: PropsType) => {
  const { t } = useTranslation('convenience-store-map');

  return (
    <Modal
      wrapClassName={`${styles.modalWrap} `}
      width={720}
      visible
      title={t('chooseConvenienceStore')}
      onCancel={close}
      maskClosable={false}
      footer={null}
    >
      {/* FIXME:fix ios body overflow: hidden bug */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
              @media (max-width: ${styles.screenSmMax}) {
                body { position: fixed; }
              }
            `,
        }}
      />

      <Tabs
        className={styles.tabs}
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
    </Modal>
  );
});
