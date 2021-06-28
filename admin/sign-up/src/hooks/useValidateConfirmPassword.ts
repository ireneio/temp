// typescript import
import { FormItemProps } from 'antd/lib/form';

import { ValuesType } from './useApplyForStore';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<FormItemProps<ValuesType>['rules']>[number] => {
  const { t } = useTranslation('sign-up');

  return useCallback(
    ({ getFieldValue }) => ({
      validator: async (_: unknown, value: string) => {
        if (value && value !== getFieldValue(['password']))
          throw new Error(t('confirm-password.error'));
      },
    }),
    [t],
  );
};
