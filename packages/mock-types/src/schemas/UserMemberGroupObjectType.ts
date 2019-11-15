// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { UserMemberGroupObjectTypeMock } from './__generated__/UserMemberGroupObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment UserMemberGroupObjectTypeMock on UserMemberGroupObjectType {
    unlimitedDate
  }
`;

export default mock.add<UserMemberGroupObjectTypeMock>(
  'UserMemberGroupObjectType',
  [
    () => ({
      __typename: 'UserMemberGroupObjectType',
      unlimitedDate: false,
    }),
    () => ({
      __typename: 'UserMemberGroupObjectType',
      unlimitedDate: true,
    }),
  ],
);
