// import
import mock from '../mock';

// graphql typescript
import { JustifyContent } from '../../../../__generated__/meepshop';
import { imageModuleMockFragment } from './gqls/__generated__/imageModuleMockFragment';

// definition
export default mock.add<imageModuleMockFragment>('ImageModule', [
  () => ({
    __typename: 'ImageModule',
    image: null,
    link: null,
    width: 100,
    justifyContent: 'FLEX_START' as JustifyContent,
    alt: 'alt',
  }),
  () => ({
    __typename: 'ImageModule',
    image: null,
    link: {},
    width: 100,
    justifyContent: 'FLEX_START' as JustifyContent,
    alt: 'alt',
  }),
]);
