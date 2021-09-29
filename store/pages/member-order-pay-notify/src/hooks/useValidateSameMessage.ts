// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (
  initialValue: string,
): ((rules: unknown, value: string) => void) => {
  const { t } = useTranslation('member-order-pay-notify');

  return useCallback(
    async (_, value) => {
      if (value && value === initialValue)
        throw new Error(t('pay-message-is-not-updated'));
    },
    [initialValue, t],
  );
};
