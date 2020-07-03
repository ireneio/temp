import React from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { storeClose } from '@meepshop/images';

import './styles/index.less';

export default () => {
  const { t } = useTranslation('common');

  return (
    <div className="close-view-root">
      <img src={storeClose} alt="store-close" />
      <div>{t('close')}</div>
      <div>{t('come-back-soon')}</div>
      <div>Sorry, we are closed and will be back soon.</div>
      <Button
        type="primary"
        shape="round"
        href="https://www.meepshop.com"
        target="_blank"
      >
        {t('want-to-open-store')}
      </Button>
    </div>
  );
};
