// import
import { gql } from '@apollo/client';

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
