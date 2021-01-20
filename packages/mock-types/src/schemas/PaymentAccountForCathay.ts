// import
import mock from '../mock';

// graphql typescript
import {
  CathayPaymentTypeEnum,
  paymentAccountForCathayMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<paymentAccountForCathayMockFragment>(
  'PaymentAccountForCathay',
  [
    () => ({
      __typename: 'PaymentAccountForCathay',
      type: 'CREDIT' as CathayPaymentTypeEnum,
    }),
    () => ({
      __typename: 'PaymentAccountForCathay',
      type: 'ATM' as CathayPaymentTypeEnum,
    }),
  ],
);
