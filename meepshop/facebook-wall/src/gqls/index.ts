// import
import gql from 'graphql-tag';

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
