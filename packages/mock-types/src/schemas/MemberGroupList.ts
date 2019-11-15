// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import {
  MemberGroupListMock,
  MemberGroupListMock_data as MemberGroupListMockData,
} from './__generated__/MemberGroupListMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment MemberGroupListMock on MemberGroupList {
    data {
      id
      name
      type
    }
    total
  }
`;

export default mock.add<MemberGroupListMock>('MemberGroupList', [
  () => ({
    __typename: 'MemberGroupList',
    data: [
      {
        __typename: 'MemberGroup',
        id: 'helper-permission',
        name: 'name',
        type: 'custom',
      } as MemberGroupListMockData,
    ],
    total: 1,
  }),
]);
