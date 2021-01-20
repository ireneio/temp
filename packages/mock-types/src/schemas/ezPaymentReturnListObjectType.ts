// import
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import { ezPaymentReturnListObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<ezPaymentReturnListObjectTypeMockFragment>(
  'ezPaymentReturnListObjectType',
  [
    () => ({
      __typename: 'ezPaymentReturnListObjectType',
      paycode: 'paycode',
      storeName: 'storeName',
      orderNumber: 'orderNumber',
      amount: 'amount',
      expireDate: parseInt(moment().format('X'), 10),
    }),
  ],
);
