// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ViewTrackingModuleMock } from './__generated__/ViewTrackingModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ViewTrackingModuleMock on ViewTrackingModule {
    tracking {
      name
      category
    }
  }
`;

export default mock.add<ViewTrackingModuleMock>('ViewTrackingModule', [
  () =>
    ({
      __typename: 'ViewTrackingModule',
      tracking: {
        __typename: 'Tracking',
        name: 'tracking',
        category: null,
      },
    } as ViewTrackingModuleMock),
  () =>
    ({
      __typename: 'ViewTrackingModule',
      tracking: {
        __typename: 'Tracking',
        name: 'tracking',
        category: 'category',
      },
    } as ViewTrackingModuleMock),
]);
