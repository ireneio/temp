// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { isFullWidth } from 'validator';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('setting-shopping');

  return useCallback(
    async (_, value) => {
      if (isFullWidth(value)) throw new Error(t('halfwidth-only'));
    },
    [t],
  );
};
