// import
import mock from '../mock';

// graphql typescript
import { viewTrackingModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<viewTrackingModuleMockFragment>('ViewTrackingModule', [
  () => ({
    __typename: 'ViewTrackingModule',
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  }),
  () => ({
    __typename: 'ViewTrackingModule',
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: 'category',
    },
  }),
]);
