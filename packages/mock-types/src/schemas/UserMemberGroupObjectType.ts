// import
import mock from '../mock';

// graphql typescript
import { userMemberGroupObjectTypeMockFragment } from './gqls/__generated__/userMemberGroupObjectTypeMockFragment';

// definition
export default mock.add<userMemberGroupObjectTypeMockFragment>(
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
