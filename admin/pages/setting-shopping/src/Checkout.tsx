// import
import React from 'react';

import Block from '@admin/block';
import { useTranslation } from '@meepshop/locales';

import SwitchItem from './SwitchItem';

// definition
export default React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting-shopping');

    return (
      <Block title={t('checkout.title')} description={t('checkout.desc')}>
        {[
          ['setting', 'lockedCountry'],
          ['setting', 'order', 'useNotPayNow'],
        ].map(name => (
          <SwitchItem key={name.join('_')} name={name} />
        ))}
      </Block>
    );
  },
);
