// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

import parseGoogleTagManager from '../utils/parseGoogleTagManager';

// definition
export default (): ((_: unknown, value: string) => void) => {
  const { t } = useTranslation('web-track');

  return useCallback(
    async (_, value) => {
      if (value && !parseGoogleTagManager(value))
        throw new Error(t('google-tag-manager.parse-fail'));
    },
    [t],
  );
};
