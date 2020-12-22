// import
import mock from '../mock';

// graphql typescript
import { priceDeltaMockFragment } from './gqls/__generated__/priceDeltaMockFragment';

// definition
export default mock.add<priceDeltaMockFragment>('PriceDelta', [
  () => ({
    __typename: 'PriceDelta',
    before: 5,
    after: 3,
  }),
]);
