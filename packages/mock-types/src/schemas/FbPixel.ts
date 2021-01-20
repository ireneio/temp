// import
import mock from '../mock';

// graphql typescript
import { fbPixelMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<fbPixelMockFragment>('FbPixel', [
  () => ({
    __typename: 'FbPixel',
    pixelId: 'pixelId',
  }),
]);
