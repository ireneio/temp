// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { MemberGroupMock } from './__generated__/MemberGroupMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment MemberGroupMock on MemberGroup {
    id
    name
    type
  }
`;

export default mock.add<MemberGroupMock>('MemberGroup', [
  () =>
    ({
      __typename: 'MemberGroup',
      id: 'helper-permission',
      name: 'name',
      type: 'custom',
    } as MemberGroupMock),
]);
