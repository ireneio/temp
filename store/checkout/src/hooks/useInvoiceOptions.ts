// import
import { useMemo } from 'react';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { useInvoiceOptionsStoreInvoiceSettingFragment as useInvoiceOptionsStoreInvoiceSettingFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
type PaperKeysType = 'duplicate' | 'triplicate' | 'donation';

type ElectronicKeysType =
  | 'membershipCarrier'
  | 'mobileBarCodeCarrier'
  | 'citizenDigitalCertificateCarrier'
  | 'triplicate'
  | 'donation';

interface ChildrenType {
  value: string;
  label: string;
}

interface ReturnType {
  value: string;
  label: string;
  children: ChildrenType[];
}

// definition
export default (
  invoice: useInvoiceOptionsStoreInvoiceSettingFragmentType | null,
): ReturnType[] => {
  const { t } = useTranslation('checkout');

  return useMemo(() => {
    const paperKeys = ['duplicate', 'triplicate', 'donation'].filter(
      (key: PaperKeysType) => invoice?.paper?.[key]?.isEnabled,
    );

    const electronicKeys = [
      'membershipCarrier',
      'mobileBarCodeCarrier',
      'citizenDigitalCertificateCarrier',
      'triplicate',
      'donation',
    ].filter(
      (key: ElectronicKeysType) => invoice?.electronic?.[key]?.isEnabled,
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
              children: electronicKeys.map((key: ElectronicKeysType) => ({
                value: {
                  membershipCarrier: 'MEMBERSHIP',
                  mobileBarCodeCarrier: 'MOBILE_BARCODE',
                  citizenDigitalCertificateCarrier:
                    'CITIZEN_DIGITAL_CERTIFICATE',
                  triplicate: 'TRIPLICATE',
                  donation: 'DONATION',
                }[key],
                label: t(`invoice-e-invoice-type.${key}`),
              })),
            },
          ]),
    ];
  }, [invoice, t]);
};
