// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { isMobilePhone, isInt, isLength } from 'validator';

// definition
export default {
  extra: (value: string | undefined, errorMessage: string) =>
    !value || (isInt(value) && isLength(value, { min: 0, max: 10 }))
      ? ''
      : errorMessage,
  rule: (
    errorMessages: {
      notMobile: string;
      notNumber: string;
    },
    chooseShipmentTemplate?: string | null,
  ): NonNullable<FormListProps['rules']>[number]['validator'] => (
    _,
    value,
    callback,
  ) => {
    const isPhone = isMobilePhone(value || '', 'any');
    const isNumber = isInt(value || '');
    const isTenNumber =
      isInt(value || '') && isLength(value || '', { min: 10 });

    if (chooseShipmentTemplate) {
      switch (chooseShipmentTemplate) {
        case 'ezship':
          if (!isTenNumber)
            return callback(
              `${errorMessages.notMobile} ${errorMessages.notNumber}`,
            );
          break;

        case 'allpay':
          if (!/^(09)\d{8}$/.test(value || ''))
            return callback(errorMessages.notMobile);
          break;

        default:
          if (!isNumber) return callback(errorMessages.notNumber);
          break;
      }
    } else if (!isPhone) return callback(errorMessages.notMobile);

    return callback();
  },
};
