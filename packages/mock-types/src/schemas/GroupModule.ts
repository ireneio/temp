// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { GroupModuleMock } from './__generated__/GroupModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment GroupModuleMock on GroupModule {
    percentWidth
    componentWidth
    padding
    releaseTime
  }
`;

export default mock.add<GroupModuleMock>('GroupModule', [
  () =>
    ({
      __typename: 'GroupModule',
      percentWidth: 'WIDTH100',
      componentWidth: null,
      padding: null,
      releaseTime: null,
    } as GroupModuleMock),
  () =>
    ({
      __typename: 'GroupModule',
      percentWidth: 'WIDTH50',
      componentWidth: null,
      padding: null,
      releaseTime: null,
    } as GroupModuleMock),
]);
