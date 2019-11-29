import { isMobilePhone, isInt, isLength } from 'validator';

export default (t, chooseShipmentTemplate) => (rule, value, callback) => {
  const isPhone = isMobilePhone(value || '', 'any');
  const isNumber = isInt(value || '');
  const isTenNumber = isInt(value || '') && isLength(value || '', { min: 10 });

  if (chooseShipmentTemplate) {
    switch (chooseShipmentTemplate) {
      case 'ezship':
        if (!isTenNumber)
          return callback(`${t('not-phone')} ${t('not-number')}`);
        break;
      case 'allpay':
        if (!/^(09)\d{8}$/.test(value)) return callback(t('not-phone'));
        break;
      default:
        if (!isNumber) return callback(t('not-number'));
        break;
    }
  } else if (!isPhone) return callback(t('not-number'));

  return callback();
};

export const validateTaiwanMobileNumber = (t, value) =>
  !value || (isInt(value) && isLength(value, { min: 0, max: 10 }))
    ? ''
    : t('taiwan-mobile-ten-digits');
