// import
import mock from '../mock';

// graphql typescript
import { gmoUserInfoMockFragment } from './gqls/__generated__/gmoUserInfoMockFragment';

// definition
export default mock.add<gmoUserInfoMockFragment>('GMOUserInfo', [
  () => ({
    __typename: 'GMOUserInfo',
    exist: true,
    cardNumberFront: '1234',
    cardNumberLater: '4321',
  }),
  () => ({
    __typename: 'GMOUserInfo',
    exist: false,
    cardNumberFront: '1234',
    cardNumberLater: '4321',
  }),
]);
