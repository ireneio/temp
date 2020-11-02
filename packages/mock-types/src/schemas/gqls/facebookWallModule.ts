// import
import gql from 'graphql-tag';

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
