// import
import mock from '../mock';

// graphql typescript
import { CathayPaymentTypeEnum } from '../../../../__generated__/meepshop';
import { paymentAccountForCathayMockFragment } from './gqls/__generated__/paymentAccountForCathayMockFragment';

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
