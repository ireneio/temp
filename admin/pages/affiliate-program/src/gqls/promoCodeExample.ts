// import
import { gql } from '@apollo/client';

// definition
export const promoCodeExampleFragment = gql`
  fragment promoCodeExampleFragment on Store {
    id
    domain
    defaultDomain
  }
`;
