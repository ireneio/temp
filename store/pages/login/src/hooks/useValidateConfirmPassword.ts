// typescript import
import { FormItemProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<
  FormItemProps<{ password: string }>['rules']
>[number] => {
  const { t } = useTranslation('login');

  return useCallback(
    ({ getFieldValue }) => ({
      validator: async (_: unknown, value: string) => {
        if (value && value !== getFieldValue(['password']))
          throw new Error(t('password-is-no-match'));
      },
    }),
    [t],
  );
};
