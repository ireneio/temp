// import
import mock from '../mock';

// graphql typescript
import { priceDeltaMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<priceDeltaMockFragment>('PriceDelta', [
  () => ({
    __typename: 'PriceDelta',
    before: 5,
    after: 3,
  }),
]);
