// import
import mock from '../mock';

// graphql typescript
import { paymentForAllpayMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<paymentForAllpayMockFragment>('PaymentForAllpay', [
  () => ({
    __typename: 'PaymentForAllpay',
    ChoosePayment: 'Credit',
  }),
  () => ({
    __typename: 'PaymentForAllpay',
    ChoosePayment: 'WebATM',
  }),
  () => ({
    __typename: 'PaymentForAllpay',
    ChoosePayment: 'ATM',
  }),
  () => ({
    __typename: 'PaymentForAllpay',
    ChoosePayment: 'CVS',
  }),
  () => ({
    __typename: 'PaymentForAllpay',
    ChoosePayment: 'BARCODE',
  }),
]);
