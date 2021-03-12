// import
import React, { useState, useEffect } from 'react';
import { Popover, Tooltip, Button, Icon } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { HomePageIcon } from '@meepshop/icons';

import Modal from './Modal';
import styles from './styles/index.less';

// graphql typescript
import {
  getPagesVariables,
  usePagesPageFragment as usePagesPageFragmentType,
} from '@meepshop/types/gqls/admin';

// definition
export default React.memo(({ variables }: { variables: getPagesVariables }) => {
  const { t } = useTranslation('page-manager');
  const [visible, setVisible] = useState(false);
  const [pageType, setPageType] = useState<
    usePagesPageFragmentType['pageType']
  >(null);

  useEffect(() => {
    if (pageType && visible) setVisible(false);
  }, [pageType, visible, setVisible]);

  return (
    <>
      <Popover
        overlayClassName={styles.root}
        visible={visible}
        onVisibleChange={setVisible}
        content={
          <>
            <h4 className={styles.title}>{t('add-new-page.page')}</h4>

            <div className={styles.item} onClick={() => setPageType('home')}>
              <HomePageIcon />

              {t('home-page.title')}
            </div>

            <div className={styles.item} onClick={() => setPageType('custom')}>
              <Icon type="file" />

              {t('custom-page.title')}
            </div>

            <h4 className={styles.title}>{t('add-new-page.product-page')}</h4>

            <div
              className={styles.item}
              onClick={() => setPageType('template')}
            >
              <Icon type="layout" />

              {t('template-page.title')}
            </div>
          </>
        }
        placement="rightTop"
        trigger="click"
      >
        <Tooltip title={t('add-new-page.hint')}>
          <Button
            className={`${styles.button} ${
              visible ? styles.visible : styles.notVisible
            }`}
            type="primary"
            shape="circle"
            icon="plus"
          />
        </Tooltip>
      </Popover>

      {!pageType ? null : (
        <Modal
          pageType={pageType}
          variables={variables}
          onClose={() => setPageType(null)}
        />
      )}
    </>
  );
});
