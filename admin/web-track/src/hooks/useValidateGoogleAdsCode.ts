// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

import parseGoogleAdsCode from '../utils/parseGoogleAdsCode';

// definition
export default (): ((_: unknown, value: string) => void) => {
  const { t } = useTranslation('web-track');

  return useCallback(
    async (_, value) => {
      if (value && !parseGoogleAdsCode(value))
        throw new Error(t('google-ads.parse-fail'));
    },
    [t],
  );
};
