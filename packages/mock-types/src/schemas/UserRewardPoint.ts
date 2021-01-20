// import
import mock from '../mock';

// graphql typescript
import { userRewardPointMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<userRewardPointMockFragment>('UserRewardPoint', [
  () => ({
    __typename: 'UserRewardPoint',
    currentBalance: 100,
  }),
]);
