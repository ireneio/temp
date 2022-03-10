// import
import { gql } from '@apollo/client';

// definition
export const searchPartners = gql`
  query searchPartners($filter: AffiliatePartnersFilterInput) {
    viewer {
      id
      affiliatePartners(first: 5, filter: $filter) {
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
