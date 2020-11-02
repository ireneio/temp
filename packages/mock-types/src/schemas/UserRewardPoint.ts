// import
import mock from '../mock';

// graphql typescript
import { userRewardPointMockFragment } from './gqls/__generated__/userRewardPointMockFragment';

// definition
export default mock.add<userRewardPointMockFragment>('UserRewardPoint', [
  () => ({
    __typename: 'UserRewardPoint',
    currentBalance: 100,
  }),
]);
