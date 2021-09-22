// import
import mock from '../mock';

// graphql typescript
import {
  PercentWidth,
  GroupModuleComponentWidth,
  GroupModulePadding,
  groupModuleMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<groupModuleMockFragment>('GroupModule', [
  () => ({
    __typename: 'GroupModule',
    percentWidth: 'WIDTH100' as PercentWidth,
    componentWidth: null,
    padding: null,
    releaseTime: null,
    backgroundImage: null,
  }),
  () => ({
    __typename: 'GroupModule',
    percentWidth: 'WIDTH50' as PercentWidth,
    componentWidth: null,
    padding: null,
    releaseTime: null,
    backgroundImage: {},
  }),
  () => ({
    __typename: 'GroupModule',
    percentWidth: 'WIDTH100' as PercentWidth,
    componentWidth: 'WIDTH300' as GroupModuleComponentWidth,
    padding: 'PADDING30' as GroupModulePadding,
    releaseTime: null,
    backgroundImage: {},
  }),
]);
