// import
import mock from '../mock';

// graphql typescript
import { facebookWallModuleMockFragment } from './gqls/__generated__/facebookWallModuleMockFragment';

// definition
const href = 'https://www.facebook.com/meepshop';

export default mock.add<facebookWallModuleMockFragment>('FacebookWallModule', [
  () =>
    ({
      __typename: 'FacebookWallModule',
      href,
      justifyContent: 'FLEX_START',
      showPosts: true,
      showFacepile: true,
      smallHeader: true,
      hideCover: true,
      hideCta: true,
    } as facebookWallModuleMockFragment),
  () =>
    ({
      __typename: 'FacebookWallModule',
      href,
      justifyContent: 'CENTER',
      showPosts: false,
      showFacepile: false,
      smallHeader: false,
      hideCover: false,
      hideCta: false,
    } as facebookWallModuleMockFragment),
  () =>
    ({
      __typename: 'FacebookWallModule',
      href,
      justifyContent: 'FLEX_END',
      showPosts: true,
      showFacepile: false,
      smallHeader: true,
      hideCover: false,
      hideCta: true,
    } as facebookWallModuleMockFragment),
]);
