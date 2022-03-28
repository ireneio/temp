// typescript import
import { FormListProps } from 'antd/lib/form';
import { IsURLOptions } from 'validator';

// import
import { useCallback } from 'react';
import { isURL } from 'validator';

import { useTranslation } from '@meepshop/locales';

// definition
export default (
  options?: IsURLOptions,
): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('form-url');

  return useCallback(
    async (_, value) => {
      if (value && !isURL(value, options)) throw new Error(t('not-url'));
    },
    [options, t],
  );
};
