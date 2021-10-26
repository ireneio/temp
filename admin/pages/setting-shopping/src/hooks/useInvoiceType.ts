// import
import { useMemo } from 'react';

// graphql typescript
import {
  EInvoiceSettingTypeEnum,
  useInvoiceTypeFragment as useInvoiceTypeFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PaperType {
  isEnable: boolean;
  paperType?: string[];
}

interface EcpayType {
  type?: EInvoiceSettingTypeEnum | null;
  isDelay?: number;
  delayDays?: number | null;
  ecpay?: {
    MerchantID: string | null;
    HashKey: string | null;
    HashIV: string | null;
  };
}

interface ElectronicType extends EcpayType {
  isEnable: boolean;
  electronicType?: string[];
}

export interface InvoiceType {
  paper: PaperType | null;
  electronic: ElectronicType | null;
}

// definition
export const paperInvoiceType = [
  'duplicate',
  'triplicate',
  'donation',
] as const;

export const electronicInvoiceType = [
  'membershipCarrier',
  'mobileBarCodeCarrier',
  'citizenDigitalCertificateCarrier',
  'triplicate',
  'donation',
] as const;

export default (
  invoice: useInvoiceTypeFragmentType | null,
): InvoiceType | null =>
  useMemo(() => {
    if (!invoice) return null;

    const type =
      invoice.electronic?.type || ('ECPAY' as EInvoiceSettingTypeEnum);
    const ecpay: EcpayType = {
      type,
      ...(type !== 'ECPAY'
        ? null
        : {
            isDelay: !invoice.electronic?.isDelay ? 0 : 1,
            ecpay: {
              MerchantID: invoice.electronic?.ecpay?.MerchantID || null,
              HashKey: invoice.electronic?.ecpay?.HashKey || null,
              HashIV: invoice.electronic?.ecpay?.HashIV || null,
            },
            ...(!invoice.electronic?.isDelay
              ? null
              : {
                  delayDays: invoice.electronic.delayDays || 1,
                }),
          }),
    };

    const paper = !invoice.paper
      ? null
      : paperInvoiceType.reduce(
          (result, key: typeof paperInvoiceType[number]) =>
            !invoice.paper?.[key]?.isEnabled
              ? result
              : {
                  isEnable: true,
                  paperType: [...(result.paperType || []), key],
                },
          {
            isEnable: false,
          } as PaperType,
        );

    const electronic = !invoice.electronic
      ? null
      : electronicInvoiceType.reduce(
          (result, key: typeof electronicInvoiceType[number]) =>
            !invoice.electronic?.[key]?.isEnabled
              ? result
              : {
                  isEnable: true,
                  electronicType: [...(result.electronicType || []), key],
                  ...ecpay,
                },
          {
            isEnable: false,
          } as ElectronicType,
        );

    return {
      paper,
      electronic,
    };
  }, [invoice]);
