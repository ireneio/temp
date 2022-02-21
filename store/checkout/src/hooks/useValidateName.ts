// import
import { useCallback } from 'react';
import { isAlpha, isLength } from 'validator';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): ((
  value: string | null,
  shipmentTemplate: string,
) => void) => {
  const { t } = useTranslation('checkout');

  return useCallback(
    async (value, shipmentTemplate) => {
      if (!value) return;

      switch (shipmentTemplate) {
        case 'ezship':
          if (value.length > 60)
            throw new Error(t('name-too-long', { amount: 60 }));
          break;

        case 'gmo':
          if (value.length > 10)
            throw new Error(t('name-too-long', { amount: 10 }));
          break;

        case 'allpay':
          if (/[\^'`!@#%&*+$~\-(){}\\"<>|_[\] ,，\d]/.test(value))
            throw new Error(t('allpay-name-too-long'));

          if (isAlpha(value)) {
            if (!isLength(value, { min: 4, max: 10 }))
              throw new Error(t('allpay-name-too-long'));
          } else if (!isLength(value, { min: 2, max: 5 }))
            throw new Error(t('allpay-name-too-long'));
          break;

        default:
          break;
      }
    },
    [t],
  );
};
