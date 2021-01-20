// import
import mock from '../mock';

// graphql typescript
import {
  MemberGroupTypeEnum,
  memberGroupMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<memberGroupMockFragment>('MemberGroup', [
  () => ({
    __typename: 'MemberGroup',
    id: 'helper-permission',
    name: 'name',
    type: 'custom' as MemberGroupTypeEnum,
  }),
]);
