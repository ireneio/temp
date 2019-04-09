import { gql } from 'apollo-boost';

import mock from '../mock';
import { PaymentAccountForEzpayMock } from './__generated__/PaymentAccountForEzpayMock';

// eslint-disable-next-line no-unused-expressions
gql`
  fragment PaymentAccountForEzpayMock on PaymentAccountForEzpay {
    merchantNumber
  }
`;

export default mock.add<PaymentAccountForEzpayMock>('PaymentAccountForEzpay', [
  () => ({
    __typename: 'PaymentAccountForEzpay',
    merchantNumber: 'merchantNumber',
  }),
]);
