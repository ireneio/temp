// import
import mock from '../mock';

// graphql typescript
import { paymentAccountForEzpayMockFragment } from '@meepshop/types/gqls/meepshop';

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
