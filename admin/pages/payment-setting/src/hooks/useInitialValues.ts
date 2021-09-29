// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useMemo, useRef, useEffect } from 'react';
import { areEqual } from 'fbjs';

// graphql typescript
import {
  useInitialValuesStoreBillingSettingFragment as useInitialValuesStoreBillingSettingFragmentType,
  StoreBillingInvoiceSettingAccountTypeEnum,
  StoreBillingPaymentMethodEnum,
} from '@meepshop/types/gqls/admin';

// typescript definition
export interface ValuesType {
  invoice: {
    email: string | null;
    accountType: StoreBillingInvoiceSettingAccountTypeEnum | null;
    name: string | null;
    addressV2: {
      address: (string | null)[];
      zipCode: string | null;
    };
    street: string | null;
    title: string | null;
    ban: string | null;
  };
  payment: {
    method: StoreBillingPaymentMethodEnum | null;
  };
}

// definition
export default (
  { resetFields }: FormInstance,
  billing: useInitialValuesStoreBillingSettingFragmentType | null,
): ValuesType | undefined => {
  const initialValues = useMemo(() => {
    if (!billing) return undefined;

    return {
      invoice: {
        email: billing.invoice?.email || null,
        accountType: billing.invoice?.accountType || null,
        name: billing.invoice?.name || null,
        addressV2: {
          address: [
            billing.invoice?.addressV2?.country?.id || null,
            billing.invoice?.addressV2?.city?.id || null,
            billing.invoice?.addressV2?.area?.id || null,
          ],
          zipCode: billing.invoice?.addressV2?.zipCode || null,
        },
        street: billing.invoice?.addressV2?.street || null,
        title: billing.invoice?.title || null,
        ban: billing.invoice?.ban || null,
      },
      payment: {
        method: billing.payment?.method || null,
      },
    };
  }, [billing]);

  const prevInitialValuesRef = useRef(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValuesRef.current, initialValues)) {
      resetFields();
      prevInitialValuesRef.current = initialValues;
    }
  }, [resetFields, initialValues]);

  return initialValues;
};
