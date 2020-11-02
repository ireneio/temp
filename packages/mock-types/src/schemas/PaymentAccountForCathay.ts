// import
import mock from '../mock';

// graphql typescript
import { paymentAccountForCathayMockFragment } from './gqls/__generated__/paymentAccountForCathayMockFragment';

// definition
export default mock.add<paymentAccountForCathayMockFragment>(
  'PaymentAccountForCathay',
  [
    () =>
      ({
        __typename: 'PaymentAccountForCathay',
        type: 'CREDIT',
      } as paymentAccountForCathayMockFragment),
    () =>
      ({
        __typename: 'PaymentAccountForCathay',
        type: 'ATM',
      } as paymentAccountForCathayMockFragment),
  ],
);
