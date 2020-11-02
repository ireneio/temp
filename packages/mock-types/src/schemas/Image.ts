// import
import { dashboardCost_scaledSrc as dashboardCost } from '@meepshop/images';

import mock from '../mock';

// graphql typescript
import { imageMockFragment } from './gqls/__generated__/imageMockFragment';

// definition
export default mock.add<imageMockFragment>('Image', [
  () => ({
    __typename: 'Image',
    scaledSrc: null,
  }),
  () => ({
    __typename: 'Image',
    scaledSrc: {
      ...dashboardCost,
      __typename: 'ScaledURLs',
    },
  }),
]);
