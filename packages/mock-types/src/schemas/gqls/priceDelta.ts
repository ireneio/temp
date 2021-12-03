// import
import { gql } from '@apollo/client';

// definition
export const priceDeltaMockFragment = gql`
  fragment priceDeltaMockFragment on PriceDelta {
    before
    after
  }
`;
