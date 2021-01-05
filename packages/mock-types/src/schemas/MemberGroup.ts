// import
import mock from '../mock';

// graphql typescript
import { MemberGroupTypeEnum } from '../../../../__generated__/meepshop';
import { memberGroupMockFragment } from './gqls/__generated__/memberGroupMockFragment';

// definition
export default mock.add<memberGroupMockFragment>('MemberGroup', [
  () => ({
    __typename: 'MemberGroup',
    id: 'helper-permission',
    name: 'name',
    type: 'custom' as MemberGroupTypeEnum,
  }),
]);
