// import
import { gql } from '@apollo/client';

// definition
export const validatePartnerName = gql`
  query validatePartnerName($partnerName: String) {
    isAffiliatePartnerNameValid(partnerName: $partnerName) {
      ... on OkResponse {
        message
      }
    }
  }
`;
