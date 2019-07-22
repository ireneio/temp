// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { UserRewardPointMock } from './__generated__/UserRewardPointMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment UserRewardPointMock on UserRewardPoint {
    currentBalance
  }
`;

export default mock.add<UserRewardPointMock>('UserRewardPoint', [
  () => ({
    __typename: 'UserRewardPoint',
    currentBalance: 100,
  }),
]);
