// import
import mock from '../mock';

// graphql typescript
import { backgroundImageMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<backgroundImageMockFragment>('BackgroundImage', [
  () => ({
    __typename: 'BackgroundImage',
    image: {},
    cover: false,
    repeat: false,
  }),
  () => ({
    __typename: 'BackgroundImage',
    image: {},
    cover: true,
    repeat: false,
  }),
  () => ({
    __typename: 'BackgroundImage',
    image: {},
    cover: false,
    repeat: true,
  }),
  () => ({
    __typename: 'BackgroundImage',
    image: {},
    cover: true,
    repeat: true,
  }),
]);
