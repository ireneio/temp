import * as LOCALE from '../locale';

export default ({ storeSetting, transformLocale }) => {
  const { invoice } = storeSetting;
  const methods = Object.keys(invoice?.paper || {}).filter(
    method => (invoice?.paper || {})[method]?.isEnabled,
  );

  return [
    ...(methods.length
      ? [
          {
            value: 'PAPER',
            label: transformLocale(LOCALE.INVOICE_PAPER),
            children: methods.map(method => ({
              value: method.toUpperCase(),
              label: transformLocale(LOCALE.INVOICE_PAPER_TYPE[method]),
            })),
          },
        ]
      : []),
    ...(invoice?.electronic?.isEnabled
      ? [
          {
            value: `${invoice?.electronic?.type}_ELECTRONIC`,
            label: transformLocale(LOCALE.INVOICE_E_INVOICE),
            children: [
              {
                value: 'MEMBERSHIP',
                label: transformLocale(
                  LOCALE.INVOICE_E_INVOICE_TYPE.MEMBERSHIP,
                ),
              },
              {
                value: 'MOBILE_BARCODE',
                label: transformLocale(
                  LOCALE.INVOICE_E_INVOICE_TYPE.MOBILE_BARCODE,
                ),
              },
              {
                value: 'CITIZEN_DIGITAL_CERTIFICATE',
                label: transformLocale(
                  LOCALE.INVOICE_E_INVOICE_TYPE.CITIZEN_DIGITAL_CERTIFICATE,
                ),
              },
              {
                value: 'TRIPLICATE',
                label: transformLocale(LOCALE.INVOICE_E_INVOICE_TYPE.COMPANY),
              },
              {
                value: 'DONATION',
                label: transformLocale(LOCALE.INVOICE_E_INVOICE_TYPE.DONATION),
              },
            ],
          },
        ]
      : []),
  ];
};
