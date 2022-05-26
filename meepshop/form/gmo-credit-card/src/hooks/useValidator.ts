// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { startOfMonth, isBefore, parse } from 'date-fns';
import { isNumeric, isInt, isDate } from 'validator';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): {
  validateCardNumber: NonNullable<FormListProps['rules']>[number]['validator'];
  validateExpire: NonNullable<FormListProps['rules']>[number]['validator'];
  validateSecurityCode: NonNullable<
    FormListProps['rules']
  >[number]['validator'];
} => {
  const { t } = useTranslation('gmo-credit-card-form');

  return {
    validateCardNumber: useCallback(
      (_, value, callback) => {
        const cardNumberValue = value.replace(/ - /g, '');
        if (!isNumeric(cardNumberValue) || cardNumberValue.length < 16)
          return callback(t('form.cardNumberError'));

        return callback();
      },
      [t],
    ),
    validateExpire: useCallback(
      (_, value, callback) => {
        const formatValue = value.replace(/ \/ /, '/');

        if (!isDate(`01/${formatValue}`, { format: 'DD/MM/YY' }))
          return callback(t('form.invalidDate'));

        if (
          isBefore(
            parse(formatValue, 'MM/yy', new Date()),
            startOfMonth(new Date()),
          )
        ) {
          return callback(t('form.invalidDate'));
        }

        return callback();
      },
      [t],
    ),
    validateSecurityCode: useCallback(
      (_, value, callback) => {
        if (!isInt(value || '', { min: 0, max: 999 }))
          return callback(t('form.securityCodeError'));

        return callback();
      },
      [t],
    ),
  };
};
