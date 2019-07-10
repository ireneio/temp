// import
import { gql } from 'apollo-boost';
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import { UserMemberGroupObjectTypeMock } from './__generated__/UserMemberGroupObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment UserMemberGroupObjectTypeMock on UserMemberGroupObjectType {
    startDate
    expireDate
    unlimitedDate
  }
`;

export default mock.add<UserMemberGroupObjectTypeMock>(
  'UserMemberGroupObjectType',
  [
    () => ({
      __typename: 'UserMemberGroupObjectType',
      startDate: moment().unix(),
      expireDate: moment().unix(),
      unlimitedDate: false,
    }),
    () => ({
      __typename: 'UserMemberGroupObjectType',
      startDate: moment().unix(),
      expireDate: moment().unix(),
      unlimitedDate: true,
    }),
  ],
);
