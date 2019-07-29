// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { PaymentForAllpayMock } from './__generated__/PaymentForAllpayMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment PaymentForAllpayMock on PaymentForAllpay {
    ChoosePayment
  }
`;

export default mock.add<PaymentForAllpayMock>('PaymentForAllpay', [
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
