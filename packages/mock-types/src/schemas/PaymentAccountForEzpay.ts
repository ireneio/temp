// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { PaymentAccountForEzpayMock } from './__generated__/PaymentAccountForEzpayMock';

// definition
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
