// import
import { useCallback } from 'react';
import { isMobilePhone, isInt, isLength } from 'validator';

import { useTranslation } from '@meepshop/locales';

// typescript definition
interface ReturnType {
  validateMobile: (value: string | null, shipmentTemplate?: string) => void;
  validateTaiwanMobileNumber: (value: string) => string;
}

// definition
export default (): ReturnType => {
  const { t } = useTranslation('checkout');

  return {
    validateMobile: useCallback(
      async (value, shipmentTemplate) => {
        const isPhone = isMobilePhone(value || '', 'any');
        const isNumber = isInt(value || '');
        const isTenNumber =
          isInt(value || '') && isLength(value || '', { min: 10 });

        if (shipmentTemplate) {
          switch (shipmentTemplate) {
            case 'ezship':
              if (!isTenNumber)
                throw new Error(
                  `${t('validate-mobile:not-phone')} ${t(
                    'validate-mobile:not-number',
                  )}`,
                );
              break;
            case 'allpay':
              if (!/^(09)\d{8}$/.test(value || ''))
                throw new Error(t('validate-mobile:not-phone'));
              break;
            default:
              if (!isNumber) throw new Error(t('validate-mobile:not-number'));
              break;
          }
        } else if (value && !isPhone)
          throw new Error(t('validate-mobile:not-number'));
      },
      [t],
    ),
    validateTaiwanMobileNumber: useCallback(
      value =>
        !value || (isInt(value) && isLength(value, { min: 0, max: 10 }))
          ? ''
          : t('validate-mobile:taiwan-mobile-ten-digits'),
      [t],
    ),
  };
};
