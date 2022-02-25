// import
import { gql } from '@apollo/client';

// definition
export const usePartnersColumnsFragment = gql`
  fragment usePartnersColumnsFragment on AffiliatePartnerEdge {
    node {
      id
      name
      email
      createdAt
    }
  }
`;
