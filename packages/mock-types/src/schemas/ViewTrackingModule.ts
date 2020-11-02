// import
import mock from '../mock';

// graphql typescript
import { viewTrackingModuleMockFragment } from './gqls/__generated__/viewTrackingModuleMockFragment';

// definition
export default mock.add<viewTrackingModuleMockFragment>('ViewTrackingModule', [
  () =>
    ({
      __typename: 'ViewTrackingModule',
      tracking: {
        __typename: 'Tracking',
        name: 'tracking',
        category: null,
      },
    } as viewTrackingModuleMockFragment),
  () =>
    ({
      __typename: 'ViewTrackingModule',
      tracking: {
        __typename: 'Tracking',
        name: 'tracking',
        category: 'category',
      },
    } as viewTrackingModuleMockFragment),
]);
