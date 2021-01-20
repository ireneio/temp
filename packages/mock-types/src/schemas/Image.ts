// import
import { dashboardCost_scaledSrc as dashboardCost } from '@meepshop/images';

import mock from '../mock';

// graphql typescript
import { imageMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<imageMockFragment>('Image', [
  () => ({
    __typename: 'Image',
    scaledSrc: {
      ...dashboardCost,
      __typename: 'ScaledURLs',
    },
  }),
  () => ({
    __typename: 'Image',
    scaledSrc: null,
  }),
]);
