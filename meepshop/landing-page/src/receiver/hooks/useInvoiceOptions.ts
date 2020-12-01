// typescript import
import { CascaderOptionType } from 'antd/lib/cascader';

// import
import { useMemo } from 'react';
import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  landingPageUserFragment_store_setting as landingPageUserFragmentStoreSetting,
  landingPageUserFragment_store_setting_invoice_paper as landingPageUserFragmentStoreSettingInvoicePaper,
  landingPageUserFragment_store_setting_invoice_electronic as landingPageUserFragmentStoreSettingInvoiceElectronic,
} from '../../gqls/__generated__/landingPageUserFragment';

// definition
export default (
  storeSetting?: landingPageUserFragmentStoreSetting | null,
): CascaderOptionType[] => {
  const { t } = useTranslation('landing-page');

  return useMemo(() => {
    if (!storeSetting?.invoice) return [];

    const { invoice } = storeSetting;
    const paperKeys = Object.keys(invoice?.paper || {}).filter(
      key =>
        invoice?.paper?.[
          key as keyof Omit<
            landingPageUserFragmentStoreSettingInvoicePaper,
            '__typename'
          >
        ]?.isEnabled,
    );
    const electronicKeys = Object.keys(invoice?.electronic || {}).filter(
      key =>
        invoice?.electronic?.[
          key as keyof Omit<
            landingPageUserFragmentStoreSettingInvoiceElectronic,
            '__typename' | 'type'
          >
        ]?.isEnabled,
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
                  citizenDigitalCertificateCarrier:
                    'CITIZEN_DIGITAL_CERTIFICATE',
                  mobileBarCodeCarrier: 'MOBILE_BARCODE',
                }[
                  key as keyof Omit<
                    landingPageUserFragmentStoreSettingInvoiceElectronic,
                    '__typename' | 'type'
                  >
                ],
                label: t(`invoice-e-invoice-type.${key}`),
              })),
            },
          ]),
    ];
  }, [t, storeSetting]);
};
