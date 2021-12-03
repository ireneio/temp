// import
import { gql } from '@apollo/client';

// definition
export const facebookWallModuleMockFragment = gql`
  fragment facebookWallModuleMockFragment on FacebookWallModule {
    href
    justifyContent
    showPosts
    showFacepile
    smallHeader
    hideCover
    hideCta
  }
`;
