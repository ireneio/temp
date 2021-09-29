// typescript import
import { FormItemProps } from 'antd/lib/form';

import { ValuesType } from './useMemberChangePassword';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<FormItemProps<ValuesType>['rules']>[number] => {
  const { t } = useTranslation('member-password-change');

  return useCallback(
    ({ getFieldValue }) => ({
      validator: async (_: unknown, value: string) => {
        if (value && value !== getFieldValue(['newPassword']))
          throw new Error(t('form.password-not-match'));
      },
    }),
    [t],
  );
};
