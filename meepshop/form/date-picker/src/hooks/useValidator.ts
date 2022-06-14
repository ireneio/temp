// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('form-date-picker');

  return useCallback(
    async (_: unknown, value: Date) => {
      if (!value) throw new Error(t('required'));
    },
    [t],
  );
};
