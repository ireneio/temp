// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { priceObjectTypeMock } from './__generated__/priceObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment priceObjectTypeMock on priceObjectType {
    total
    shipmentFee
    paymentFee
    currency
  }
`;

export default mock.add<priceObjectTypeMock>('priceObjectType', [
  () => ({
    __typename: 'priceObjectType',
    total: 100,
    shipmentFee: 10,
    paymentFee: 10,
    currency: 'NTD',
  }),
]);
