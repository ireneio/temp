// import
import mock from '../mock';

// graphql typescript
import { groupModuleMockFragment } from './gqls/__generated__/groupModuleMockFragment';

// definition
export default mock.add<groupModuleMockFragment>('GroupModule', [
  () =>
    ({
      __typename: 'GroupModule',
      percentWidth: 'WIDTH100',
      componentWidth: null,
      padding: null,
      releaseTime: null,
      backgroundImage: null,
    } as groupModuleMockFragment),
  () =>
    ({
      __typename: 'GroupModule',
      percentWidth: 'WIDTH50',
      componentWidth: null,
      padding: null,
      releaseTime: null,
      backgroundImage: {},
    } as groupModuleMockFragment),
]);
