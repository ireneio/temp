// import
import gql from 'graphql-tag';

// definition
export const priceObjectTypeMockFragment = gql`
  fragment priceObjectTypeMockFragment on priceObjectType {
    total
    shipmentFee
    paymentFee
    currency
  }
`;
