// import
import { gql } from '@apollo/client';

// definition
export const searchPartners = gql`
  query searchPartners($filter: AffiliatePartnersFilterInput) {
    viewer {
      id
      affiliatePartners(first: 25, filter: $filter) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

export const searchPartner = gql`
  query searchPartner($affiliatePartnerId: ID!) {
    viewer {
      id
      affiliatePartner(id: $affiliatePartnerId) {
        id
        name
      }
    }
  }
`;
