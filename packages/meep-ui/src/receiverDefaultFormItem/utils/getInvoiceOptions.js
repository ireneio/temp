export default ({ storeSetting, t }) => {
  const { invoice } = storeSetting;
  const methods = Object.keys(invoice?.paper || {}).filter(
    method => (invoice?.paper || {})[method]?.isEnabled,
  );

  return [
    ...(methods.length
      ? [
          {
            value: 'PAPER',
            label: t('invoice-paper'),
            children: methods.map(method => ({
              value: method.toUpperCase(),
              label: t(`invoice-paper-type.${method}`),
            })),
          },
        ]
      : []),
    ...(invoice?.electronic?.isEnabled
      ? [
          {
            value: `${invoice?.electronic?.type}_ELECTRONIC`,
            label: t('invoice-e-invoice'),
            children: [
              {
                value: 'MEMBERSHIP',
                label: t('invoice-e-invoice-type.membership'),
              },
              {
                value: 'MOBILE_BARCODE',
                label: t('invoice-e-invoice-type.mobile-barcode'),
              },
              {
                value: 'CITIZEN_DIGITAL_CERTIFICATE',
                label: t('invoice-e-invoice-type.citizen-digital-certificate'),
              },
              {
                value: 'TRIPLICATE',
                label: t('invoice-e-invoice-type.company'),
              },
              {
                value: 'DONATION',
                label: t('invoice-e-invoice-type.donation'),
              },
            ],
          },
        ]
      : []),
  ];
};
