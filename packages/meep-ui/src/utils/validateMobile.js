import { isMobilePhone, isInt, isLength } from 'validator';

const NOT_PHONE = {
  zh_TW: '手機格式有誤',
  en_US: 'Invalid mobile number',
  ja_JP: '携帯電話番号が正しくありません',
  vi_VN: 'Định dạng điện thoại không hợp lệ',
  TODO_LOCALE: true,
};

const NOT_NUMBER = {
  zh_TW: '請輸入純數字',
  en_US: 'This entry can only contain numbers',
  ja_JP: '',
  vi_VN: '',
  TODO_LOCALE: true,
};

export const TAIWAN_MOBILE_TEN_DIGITS = {
  zh_TW: '台灣區手機號碼應為10碼',
  en_US: 'Taiwan mobile phone number is 10 digits',
  ja_JP: '台湾の携帯電話番号は10桁です',
  vi_VN: 'Khu vực Đài Loan số điện thoại nên là 10 số',
  TODO_LOCALE: true,
};

export default (transformLocale, chooseShipmentTemplate) => (
  rule,
  value,
  callback,
) => {
  const isPhone = isMobilePhone(value || '', 'any');
  const isNumber = isInt(value || '');
  const isTenNumber = isInt(value || '') && isLength(value || '', { min: 10 });

  if (chooseShipmentTemplate) {
    switch (chooseShipmentTemplate) {
      case 'ezship':
        if (!isTenNumber)
          return callback(
            `${transformLocale(NOT_PHONE)} ${transformLocale(NOT_NUMBER)}`,
          );
        break;
      case 'allpay':
        if (!/^(09)\d{8}$/.test(value)) {
          return callback(transformLocale(NOT_PHONE));
        }
        break;
      default:
        if (!isNumber) return callback(transformLocale(NOT_NUMBER));
    }
  } else if (!isPhone) {
    return callback(transformLocale(NOT_PHONE));
  }

  return callback();
};

export const validateTaiwanMobileNumber = (transformLocale, value) => {
  if (!value || (isInt(value) && isLength(value, { min: 0, max: 10 }))) {
    return '';
  }
  return transformLocale(TAIWAN_MOBILE_TEN_DIGITS);
};
