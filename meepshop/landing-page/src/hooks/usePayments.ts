// typescript import
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form';

// import
import { useMemo } from 'react';

// graphql typescript
import {
  usePaymentsLandingPageModuleFragment_storePayments as usePaymentsLandingPageModuleFragmentStorePayments,
  usePaymentsOrderFragment_categories as usePaymentsOrderFragmentCategories,
  usePaymentsOrderFragment_categories_paymentList as PaymentType,
} from '@meepshop/types/gqls/meepshop';

// definition
export default (
  paymentTemplates: usePaymentsOrderFragmentCategories['paymentList'],
  storePayments: usePaymentsLandingPageModuleFragmentStorePayments[],
  form: FormComponentProps['form'],
): [PaymentType | null, PaymentType[]] => {
  const { getFieldValue } = form;

  const payments = useMemo(() => {
    if (!paymentTemplates) return [];

    return storePayments
      .map(storePayment =>
        paymentTemplates.find(
          payment => payment?.paymentId === storePayment.id,
        ),
      )
      .filter(Boolean) as PaymentType[];
  }, [paymentTemplates, storePayments]);

  return [
    useMemo(
      () =>
        payments.find(
          payment => payment.paymentId === getFieldValue('paymentId'),
        ) || null,
      [payments, getFieldValue],
    ),
    payments,
  ];
};
