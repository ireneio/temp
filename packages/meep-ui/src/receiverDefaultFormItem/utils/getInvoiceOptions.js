export default ({ storeSetting, t }) => {
  const { invoice } = storeSetting;
  const paperKeys = Object.keys(invoice?.paper || {}).filter(
    key => invoice.paper[key].isEnabled,
  );
  const electronicKeys = Object.keys(invoice?.electronic || {}).filter(
    key => key !== 'type' && invoice.electronic[key].isEnabled,
  );

  return [
    ...(paperKeys.length === 0
      ? []
      : [
          {
            value: 'PAPER',
            label: t('invoice-paper'),
            children: paperKeys.map(key => ({
              value: key.toUpperCase(),
              label: t(`invoice-paper-type.${key}`),
            })),
          },
        ]),
    ...(electronicKeys.length === 0
      ? []
      : [
          {
            value: `${invoice?.electronic?.type}_ELECTRONIC`,
            label: t('invoice-e-invoice'),
            children: electronicKeys.map(key => ({
              value: {
                triplicate: 'TRIPLICATE',
                donation: 'DONATION',
                membershipCarrier: 'MEMBERSHIP',
                citizenDigitalCertificateCarrier: 'CITIZEN_DIGITAL_CERTIFICATE',
                mobileBarCodeCarrier: 'MOBILE_BARCODE',
              }[key],
              label: t(`invoice-e-invoice-type.${key}`),
            })),
          },
        ]),
  ];
};
