// import
import { gql } from '@apollo/client';

// definition
export const validatePromoCode = gql`
  query validatePromoCode($promoCode: String!) {
    isAffiliatePromoCodeValid(promoCode: $promoCode) {
      ... on OkResponse {
        message
      }
    }
  }
`;
