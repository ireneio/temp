import React from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { storeClose } from '@meepshop/images';

import './styles/index.less';

export default ({ closed }) => {
  const { t } = useTranslation('common');

  return (
    <div className="close-view-root">
      <img src={storeClose} alt="store-close" />
      <div>{t(`${closed}.title`)}</div>
      <div>{t(`${closed}.description`)}</div>
      <div>
        {closed === 'RESTED'
          ? 'Sorry, we are temporarily closed and will be back soon.'
          : 'Sorry, we are closed and will be back soon.'}
      </div>
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
