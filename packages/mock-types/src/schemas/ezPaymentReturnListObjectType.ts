// import
import { gql } from 'apollo-boost';
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import { ezPaymentReturnListObjectTypeMock } from './__generated__/ezPaymentReturnListObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ezPaymentReturnListObjectTypeMock on ezPaymentReturnListObjectType {
    paycode
    storeName
    orderNumber
    amount
    expireDate
  }
`;

export default mock.add<ezPaymentReturnListObjectTypeMock>(
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
