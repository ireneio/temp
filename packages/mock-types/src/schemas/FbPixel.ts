// import
import mock from '../mock';

// graphql typescript
import { fbPixelMockFragment } from './gqls/__generated__/fbPixelMockFragment';

// definition
export default mock.add<fbPixelMockFragment>('FbPixel', [
  () => ({
    __typename: 'FbPixel',
    pixelId: 'pixelId',
  }),
]);
