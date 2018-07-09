const NOT_PHONE = {
  zh_TW: '非手機',
  en_US: '',
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
