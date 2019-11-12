// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { FbPixelMock } from './__generated__/FbPixelMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment FbPixelMock on FbPixel {
    pixelId
  }
`;

export default mock.add<FbPixelMock>('FbPixel', [
  () => ({
    __typename: 'FbPixel',
    pixelId: 'pixelId',
  }),
]);
