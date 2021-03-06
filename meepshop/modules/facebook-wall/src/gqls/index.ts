// import
import { gql } from '@apollo/client';

// definition
export const facebookWallFragment = gql`
  fragment facebookWallFragment on FacebookWallModule {
    id
    href
    justifyContent
    showPosts
    showFacepile
    smallHeader
    hideCover
    hideCta
  }
`;
