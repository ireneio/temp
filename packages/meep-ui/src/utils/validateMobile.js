const NOT_PHONE = {
  zh_TW: '手機格式有誤',
  en_US: 'Invalid mobile number',
  ja_JP: '携帯電話番号が正しくありません',
  vi_VN: 'Định dạng điện thoại không hợp lệ',
  TODO_LOCALE: true,
};

export default (transformLocale, chooseShipmentTemplate) => (
  rule,
  value,
  callback,
) => {
  const isPhone = !/^\(?(09|886)\)?\d{2}-?\d{3}-?\d{3}$/.test(value);
  if (['allpay', 'ezship'].includes(chooseShipmentTemplate)) {
    if (isPhone) return callback(transformLocale(NOT_PHONE));
  }

  if (isPhone && !/^(\(?\d{2}\)?|\d{2}-?)\d{4}-?\d{4}$/.test(value))
    return callback(transformLocale(NOT_PHONE));

  return callback();
};
