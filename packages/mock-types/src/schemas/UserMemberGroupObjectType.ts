// import
import mock from '../mock';

// graphql typescript
import { userMemberGroupObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

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
