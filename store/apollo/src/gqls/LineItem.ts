// import
import gql from 'graphql-tag';

// definition
export const LineItemFragment = gql`
  fragment LineItemFragment on LineItem {
    id
    productId
  }
`;
