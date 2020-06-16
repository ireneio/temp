// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { FacebookWallModuleMock } from './__generated__/FacebookWallModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment FacebookWallModuleMock on FacebookWallModule {
    href
    justifyContent
    showPosts
    showFacepile
    smallHeader
    hideCover
    hideCta
  }
`;

const href = 'https://www.facebook.com/meepshop';

export default mock.add<FacebookWallModuleMock>('FacebookWallModule', [
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
    } as FacebookWallModuleMock),
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
    } as FacebookWallModuleMock),
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
    } as FacebookWallModuleMock),
]);
