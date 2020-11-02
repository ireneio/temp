// import
import mock from '../mock';

// graphql typescript
import { paymentForAllpayMockFragment } from './gqls/__generated__/paymentForAllpayMockFragment';

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
