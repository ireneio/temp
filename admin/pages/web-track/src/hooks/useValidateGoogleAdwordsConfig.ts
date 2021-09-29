// typescript import
import { FormItemProps } from 'antd/lib/form';

import { ValuesType } from './useUpdateGoogleAds';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

import parseGoogleAdwordsConfig from '../utils/parseGoogleAdwordsConfig';

// definition
export default (): NonNullable<FormItemProps<ValuesType>['rules']>[number] => {
  const { t } = useTranslation('web-track');

  return useCallback(
    ({ getFieldValue }) =>
      getFieldValue(['googleAdwordsSignUp']) ||
      getFieldValue(['googleAdwordsBeginCheckout']) ||
      getFieldValue(['googleAdwordsPurchase'])
        ? {
            validator: async (_: unknown, value: string) => {
              if (!value) throw new Error(t('required'));

              if (!parseGoogleAdwordsConfig(value))
                throw new Error(t('google-ads.parse-config-fail'));
            },
          }
        : {},
    [t],
  );
};
