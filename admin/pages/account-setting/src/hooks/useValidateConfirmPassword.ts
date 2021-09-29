// typescript import
import { FormItemProps } from 'antd/lib/form';

import { ValuesType } from './useChangeUserPassword';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<FormItemProps<ValuesType>['rules']>[number] => {
  const { t } = useTranslation('account-setting');

  return useCallback(
    ({ getFieldValue }) => ({
      validator: async (_: unknown, value: string) => {
        if (value && value !== getFieldValue(['newPassword']))
          throw new Error(t('account.confirm-password.error'));
      },
    }),
    [t],
  );
};
