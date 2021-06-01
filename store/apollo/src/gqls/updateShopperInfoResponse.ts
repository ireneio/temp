// import
import gql from 'graphql-tag';

// definition
export const updateShopperInfoResponseReadCache = gql`
  query updateShopperInfoResponseReadCache {
    viewer {
      id
    }
  }
`;

export const updateShopperInfoResponseUpdateCache = gql`
  fragment updateShopperInfoResponseUpdateCache on User {
    id
    locale
  }
`;
