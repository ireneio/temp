// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { UserMock } from './__generated__/UserMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment UserMock on User {
    groupId
    role
  }
`;

export default mock.add<UserMock>('User', [
  () =>
    ({
      __typename: 'User',
      groupId: null,
      role: 'MERCHANT',
    } as UserMock),
  () =>
    ({
      __typename: 'User',
      groupId: 'helper-permission',
      role: 'HELPER',
    } as UserMock),
]);
