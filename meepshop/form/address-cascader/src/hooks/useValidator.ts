// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (
  message?: string,
): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('form-address-cascader');

  return useCallback(
    async (_: unknown, value: { address?: string[]; zipCode?: string }) => {
      if ((value?.address || []).length === 0 || !value?.zipCode)
        throw new Error(message || t('is-required'));
    },
    [message, t],
  );
};
