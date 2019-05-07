// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { StoreMock } from './__generated__/StoreMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment StoreMock on Store {
    currency
    unpaidBills {
      totalCount
    }
  }
`;

export default mock.add<StoreMock>('Store', [
  () => ({
    __typename: 'Store',
    currency: 'TWD',
    unpaidBills: {
      __typename: 'StoreUnpaidBills',
      totalCount: 5,
    },
  }),
  () => ({
    __typename: 'Store',
    currency: null,
    unpaidBills: {
      __typename: 'StoreUnpaidBills',
      totalCount: 5,
    },
  }),
]);
