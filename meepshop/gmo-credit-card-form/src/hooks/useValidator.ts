// typescript import
import { ValidationRule } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import moment from 'moment';
import { isNumeric, isInt, isDate } from 'validator';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// definition
export default (): {
  validateCardNumber: ValidationRule['validator'];
  validateExpire: ValidationRule['validator'];
  validateSecurityCode: ValidationRule['validator'];
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
          !moment()
            .startOf('month')
            .isSameOrBefore(moment(formatValue, 'MM/YY'))
        )
          return callback(t('form.invalidDate'));

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
