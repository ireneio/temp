// import
import gql from 'graphql-tag';

// definition
export const useOptionsVariantFragment = gql`
  fragment useOptionsVariantFragment on Variant {
    id
    minPurchaseItems
    maxPurchaseLimit
    stock
  }
`;
