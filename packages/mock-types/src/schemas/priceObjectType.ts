// import
import mock from '../mock';

// graphql typescript
import { priceObjectTypeMockFragment } from './gqls/__generated__/priceObjectTypeMockFragment';

// definition
export default mock.add<priceObjectTypeMockFragment>('priceObjectType', [
  () => ({
    __typename: 'priceObjectType',
    total: 100,
    shipmentFee: 10,
    paymentFee: 10,
    currency: 'NTD',
  }),
]);
