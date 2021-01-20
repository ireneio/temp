// import
import mock from '../mock';

// graphql typescript
import { priceObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

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
