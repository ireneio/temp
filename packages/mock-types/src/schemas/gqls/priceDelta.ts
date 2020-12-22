// import
import gql from 'graphql-tag';

// definition
export const priceDeltaMockFragment = gql`
  fragment priceDeltaMockFragment on PriceDelta {
    before
    after
  }
`;
