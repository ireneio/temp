// import
import mock from '../mock';

// graphql typescript
import { paymentAccountForEzpayMockFragment } from './gqls/__generated__/paymentAccountForEzpayMockFragment';

// definition
export default mock.add<paymentAccountForEzpayMockFragment>(
  'PaymentAccountForEzpay',
  [
    () => ({
      __typename: 'PaymentAccountForEzpay',
      merchantNumber: 'merchantNumber',
    }),
  ],
);
