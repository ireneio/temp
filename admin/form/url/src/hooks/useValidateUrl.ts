// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { isURL } from 'validator';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('form-url');

  return useCallback(
    async (_, value) => {
      if (value && !isURL(value)) throw new Error(t('not-url'));
    },
    [t],
  );
};
