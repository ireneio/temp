// import
import React from 'react';
import { Input } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import useSearch from './hooks/useSearch';

// typescript definition
interface PropsType {
  visible: boolean;
}

// definition
export default React.memo(({ visible }: PropsType) => {
  const search = useSearch();
  const { t } = useTranslation('menu');

  return !visible ? null : (
    <Input onPressEnter={search} placeholder={t('search')} type="search" />
  );
});
