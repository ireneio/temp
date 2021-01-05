// import
import mock from '../mock';

// graphql typescript
import { JustifyContent } from '../../../../__generated__/meepshop';
import { facebookWallModuleMockFragment } from './gqls/__generated__/facebookWallModuleMockFragment';

// definition
const href = 'https://www.facebook.com/meepshop';

export default mock.add<facebookWallModuleMockFragment>('FacebookWallModule', [
  () => ({
    __typename: 'FacebookWallModule',
    href,
    justifyContent: 'FLEX_START' as JustifyContent,
    showPosts: true,
    showFacepile: true,
    smallHeader: true,
    hideCover: true,
    hideCta: true,
  }),
  () => ({
    __typename: 'FacebookWallModule',
    href,
    justifyContent: 'CENTER' as JustifyContent,
    showPosts: false,
    showFacepile: false,
    smallHeader: false,
    hideCover: false,
    hideCta: false,
  }),
  () => ({
    __typename: 'FacebookWallModule',
    href,
    justifyContent: 'FLEX_END' as JustifyContent,
    showPosts: true,
    showFacepile: false,
    smallHeader: true,
    hideCover: false,
    hideCta: true,
  }),
]);
