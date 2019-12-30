// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { PaymentAccountForCathayMock } from './__generated__/PaymentAccountForCathayMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment PaymentAccountForCathayMock on PaymentAccountForCathay {
    type
  }
`;

export default mock.add<PaymentAccountForCathayMock>(
  'PaymentAccountForCathay',
  [
    () =>
      ({
        __typename: 'PaymentAccountForCathay',
        type: 'CREDIT',
      } as PaymentAccountForCathayMock),
    () =>
      ({
        __typename: 'PaymentAccountForCathay',
        type: 'ATM',
      } as PaymentAccountForCathayMock),
  ],
);
