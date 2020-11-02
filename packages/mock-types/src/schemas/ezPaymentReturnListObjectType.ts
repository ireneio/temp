// import
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import { ezPaymentReturnListObjectTypeMockFragment } from './gqls/__generated__/ezPaymentReturnListObjectTypeMockFragment';

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
